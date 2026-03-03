const mongoose = require("mongoose");

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
  try {
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
    if (!mongoose.isValidObjectId(roomId)) {
      throw new HttpError(400, "Invalid room id");
    }

    const room = await Room.findOneAndUpdate(
      { _id: roomId, status: "available" },
      { $set: { status: "reserved" } },
      { new: true },
    );

    if (!room) {
      const exists = await Room.findById(roomId);
      if (!exists) throw new HttpError(404, "Room not found");
      throw new HttpError(409, "Room is not available");
    }

    try {
      const booking = await Booking.create({
        userId,
        roomId: room.id,
        checkIn,
        checkOut,
        guests: Number(guests ?? 1),
        status: "active",
      });

      res.status(201).json({
        booking: {
          id: booking.id,
          roomId: String(booking.roomId),
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          guests: booking.guests,
          status: booking.status,
          createdAt: booking.createdAt,
        },
      });
    } catch (e) {
      await Room.updateOne({ _id: roomId }, { $set: { status: "available" } });
      throw e;
    }
  } catch (e) {
    next(e);
  }
}

async function deleteBooking(req, res, next) {
  try {
    const userId = req.user.id;
    const { bookingId } = req.params;

    if (!mongoose.isValidObjectId(bookingId)) {
      throw new HttpError(400, "Invalid booking id");
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new HttpError(404, "Booking not found");

    if (String(booking.userId) !== String(userId)) {
      throw new HttpError(403, "Forbidden");
    }

    const roomId = String(booking.roomId);

    await Booking.deleteOne({ _id: booking.id });

    await Room.updateOne({ _id: roomId }, { $set: { status: "available" } });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

module.exports = { listBookings, createBooking, deleteBooking };
