import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  score: Number,
  issuedDate: { type: Date, default: Date.now },
  certificate: String,
  isRevoked: { type: Boolean, default: false },
  revokedDate: Date,
  revokedReason: String,
},{timestamps: true});

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
