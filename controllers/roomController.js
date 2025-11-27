const Room = require("../models/roomModel.js");

exports.addRoom = async (req, res) => {
  try {
    const { name, image, rate } = req.body;

    if (!name || !image || !rate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRoom = await Room.create({ name, image, rate });
    return res.status(201).json({ message: "Room added successfully", room: newRoom });
  } catch (error) {
    console.error("Add Room Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Get Rooms Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



