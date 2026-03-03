const express = require("express");
const { auth } = require("../middleware/auth");
const { requireAdmin } = require("../middleware/requireAdmin");
const {
  getRoomStatuses,
  setRoomStatus,
} = require("../controllers/admin.controller");

const router = express.Router();

router.get("/rooms/statuses", auth, requireAdmin, getRoomStatuses);
router.patch("/rooms/:roomId/status", auth, requireAdmin, setRoomStatus);

module.exports = { adminRouter: router };
