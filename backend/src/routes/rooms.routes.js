const express = require("express");
const {
  listRooms,
  getRoomDetails,
} = require("../controllers/rooms.controller");

const router = express.Router();

router.get("/", listRooms);
router.get("/:roomId", getRoomDetails);

module.exports = { roomsRouter: router };
