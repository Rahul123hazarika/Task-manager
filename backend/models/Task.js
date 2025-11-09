// server/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, default: 'Medium' },
  status: { type: String, default: 'Pending' },
  dueDate: { type: Date },
  category: { type: String, default: 'general' },
  tags: { type: [String], default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
