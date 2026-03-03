const mongoose = require("mongoose");
const { Room } = require("../models/Room");
const { HttpError } = require("../utils/httpError");

function toRoomDto(room) {
  return {
    id: String(room._id),
    number: room.number,
    title: room.title,
    description: room.description,
    price: room.price,
    status: room.status,
    image: room.image,
    gallery: room.gallery,
    amenities: room.amenities,
  };
}

async function listRooms(req, res, next) {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      if (!["available", "reserved"].includes(status)) {
        throw new HttpError(400, "Invalid status filter");
      }
      filter.status = status;
    }

    const rooms = await Room.find(filter).sort({ number: 1 }).lean();

    res.json({ items: rooms.map(toRoomDto) });
  } catch (e) {
    next(e);
  }
}

async function getRoomDetails(req, res, next) {
  try {
    const { roomId } = req.params;

    if (!mongoose.isValidObjectId(roomId)) {
      throw new HttpError(400, "Invalid room id");
    }

    const room = await Room.findById(roomId).lean();
    if (!room) throw new HttpError(404, "Room not found");

    res.json({ room: toRoomDto(room) });
  } catch (e) {
    next(e);
  }
}

module.exports = { listRooms, getRoomDetails };
