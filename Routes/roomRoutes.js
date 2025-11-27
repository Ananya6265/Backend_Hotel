const express = require("express");
const { addRoom, getRooms} = require("../controllers/roomController");

const router = express.Router();

router.post("/add", addRoom);
router.get("/all", getRooms);

module.exports = router;
