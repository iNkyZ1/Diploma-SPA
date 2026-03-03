const { Room } = require("../models/Room");
const { HttpError } = require("../utils/httpError");

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

    const items = await Room.find(filter).sort({ number: 1 });

    res.json({ items });
  } catch (e) {
    next(e);
  }
}

async function getRoomDetails(req, res, next) {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) throw new HttpError(404, "Room not found");

    res.json({ room });
  } catch (e) {
    next(e);
  }
}

module.exports = { listRooms, getRoomDetails };
