import mongoose from "mongoose";

const { Schema } = mongoose;

const flashcardSchema = new Schema({
  collection_id: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  interval: { type: Number, default: 0 },
  repetitions: { type: Number, default: 0 },
  easeFactor: { type: Number, default: 2.5 },
  dueDate: { type: Date, default: Date.now },
});

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
