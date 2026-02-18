// models/Application.js
import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  package: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);