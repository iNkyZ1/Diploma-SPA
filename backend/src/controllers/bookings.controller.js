const { Booking } = require("../models/Booking");
const { Room } = require("../models/Room");
const { HttpError } = require("../utils/httpError");

function isValidDateString(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

async function listBookings(req, res, next) {
  try {
    const userId = req.user.id;

    const items = await Booking.find({ userId }).sort({ createdAt: -1 });

    res.json({
      items: items.map((b) => ({
        id: b.id,
        roomId: String(b.roomId),
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        guests: b.guests,
        status: b.status,
        createdAt: b.createdAt,
      })),
    });
  } catch (e) {
    next(e);
  }
}

async function createBooking(req, res, next) {
  const session = await Booking.startSession();

  try {
    session.startTransaction();

    const userId = req.user.id;
    const { roomId, checkIn, checkOut, guests } = req.body || {};

    if (
      !roomId ||
      !isValidDateString(checkIn) ||
      !isValidDateString(checkOut)
    ) {
      throw new HttpError(400, "Validation error", {
        fields: ["roomId", "checkIn", "checkOut"],
      });
    }
    if (checkOut <= checkIn) {
      throw new HttpError(400, "Invalid dates");
    }

    const room = await Room.findById(roomId).session(session);
    if (!room) throw new HttpError(404, "Room not found");

    if (room.status !== "available") {
      throw new HttpError(409, "Room is not available");
    }

    const booking = await Booking.create(
      [
        {
          userId,
          roomId: room.id,
          checkIn,
          checkOut,
          guests: Number(guests ?? 1),
          status: "active",
        },
      ],
      { session },
    );

    room.status = "reserved";
    await room.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      booking: {
        id: booking[0].id,
        roomId: String(booking[0].roomId),
        checkIn: booking[0].checkIn,
        checkOut: booking[0].checkOut,
        guests: booking[0].guests,
        status: booking[0].status,
        createdAt: booking[0].createdAt,
      },
    });
  } catch (e) {
    await session.abortTransaction();
    next(e);
  } finally {
    session.endSession();
  }
}

async function deleteBooking(req, res, next) {
  const session = await Booking.startSession();

  try {
    session.startTransaction();

    const userId = req.user.id;
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId).session(session);
    if (!booking) throw new HttpError(404, "Booking not found");

    if (String(booking.userId) !== String(userId)) {
      throw new HttpError(403, "Forbidden");
    }

    const room = await Room.findById(booking.roomId).session(session);

    await Booking.deleteOne({ _id: booking.id }).session(session);

    if (room) {
      room.status = "available";
      await room.save({ session });
    }

    await session.commitTransaction();

    res.json({ ok: true });
  } catch (e) {
    await session.abortTransaction();
    next(e);
  } finally {
    session.endSession();
  }
}

module.exports = { listBookings, createBooking, deleteBooking };
