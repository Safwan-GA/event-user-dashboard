const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category:{type:String, required:true},
  createdBy: { type: String, required: true }, 
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

module.exports = Event;
