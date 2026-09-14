import mongoose from "mongoose";

const { Schema } = mongoose;

const flashcardSchema = new Schema({
  collection_id: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
