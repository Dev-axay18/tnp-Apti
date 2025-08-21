import mongoose from "mongoose";

const questionBankSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    type: { type: String, enum: ["multiple_choice", "true_false", "fill_blank", "essay"], required: true },
    category: { type: String, enum: ["Technical", "Logical", "Verbal", "Numerical", "General"], required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    options: [String],
    correctAnswer: { type: String, required: true },
    points: { type: Number, default: 1 },
    explanation: String,
    tags: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const QuestionBank = mongoose.model("QuestionBank", questionBankSchema);
export default QuestionBank;