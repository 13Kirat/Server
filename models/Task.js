const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  images: [String],
  note: String,
  assignDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
