import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  answer: String,
  isCorrect: Boolean,
  points: Number,
});

const registrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  registrationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["registered", "completed", "cancelled"], default: "registered" },
  score: Number, // percentage
  answers: [answerSchema],
  startTime: Date,
  endTime: Date,
  duration: Number, // actual time taken
  certificate: {
    certificateId: String,
    issuedDate: Date,
    downloadUrl: String,
  },
},{timestamps: true});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;