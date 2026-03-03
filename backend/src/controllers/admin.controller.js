const { Room } = require("../models/Room");
const { HttpError } = require("../utils/httpError");

async function getRoomStatuses(req, res, next) {
  try {
    const rooms = await Room.find({}).sort({ number: 1 });

    res.json({
      items: rooms.map((r) => ({
        roomId: r.id,
        number: r.number,
        status: r.status,
      })),
    });
  } catch (e) {
    next(e);
  }
}

async function setRoomStatus(req, res, next) {
  try {
    const { roomId } = req.params;
    const { status } = req.body || {};

    if (!status || !["available", "reserved"].includes(status)) {
      throw new HttpError(400, "Invalid status");
    }

    const room = await Room.findById(roomId);
    if (!room) throw new HttpError(404, "Room not found");

    room.status = status;
    await room.save();

    res.json({
      room: {
        id: room.id,
        number: room.number,
        title: room.title,
        description: room.description,
        price: room.price,
        status: room.status,
        image: room.image,
        gallery: room.gallery,
        amenities: room.amenities,
      },
    });
  } catch (e) {
    next(e);
  }
}

module.exports = { getRoomStatuses, setRoomStatus };
