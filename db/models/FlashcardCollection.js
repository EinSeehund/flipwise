import mongoose from "mongoose";

const { Schema } = mongoose;

const flashcardCollectionSchema = new Schema({
  collectionTitle: { type: String, required: true },
  colorDark: { type: String, required: true },
  colorLight: { type: String, required: true },
});

const FlashcardCollection =
  mongoose.models.FlashcardCollection ||
  mongoose.model("FlashcardCollection", flashcardCollectionSchema);

export default FlashcardCollection;
