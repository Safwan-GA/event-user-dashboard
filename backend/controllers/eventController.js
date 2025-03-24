const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const { name, description, date, category } = req.body;

  if (!name || !description || !date || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!req.user || !req.user.email) {
    return res.status(401).json({ error: "Unauthorized: User not found" });
  }

  try {
    const event = await Event.create({
      name,
      description,
      date,
      category,
      createdBy: req.user.email, 
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
