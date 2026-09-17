import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";
import { calculateNextReview } from "@/lib/sm2";

export default async function handler(request, response) {
  const { id } = request.query;
  const { evaluation } = request.body;

  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ error: "Database connection failed" });
  }

  if (request.method === "POST") {
    try {
      const flashcard = await Flashcard.findById(id);
      if (!flashcard) {
        return response.status(404).json({ error: "Flashcard not found" });
      }

      const updated = calculateNextReview(flashcard, evaluation);

      flashcard.interval = updated.interval;
      flashcard.repetitions = updated.repetitions;
      flashcard.easeFactor = updated.easeFactor;
      flashcard.dueDate = updated.dueDate;

      await flashcard.save();

      return response.status(200).json(flashcard);
    } catch (error) {
      return response.status(500).json({ error: "Error updating flashcard" });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
