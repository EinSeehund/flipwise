import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  // The query parameter "todaysdate" is only passed for testing and will be removed before merging into main
  const { due, todaysdate } = request.query;

  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ error: "Database connection failed" });
  }

  if (request.method === "GET") {
    if (due === "true") {
      const dueFlashcards = await Flashcard.find({
        // The variable todaysdate is used for testing and will be replaced with "new Date()" before merging into main
        dueDate: { $lte: todaysdate },
      });
      return response.status(200).json(dueFlashcards);
    }

    try {
      const flashcards = await Flashcard.find().sort({ _id: -1 });
      return response.status(200).json(flashcards);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error retrieving flashcards" });
    }
  }

  if (request.method === "POST") {
    try {
      await Flashcard.create(request.body);
      return response.status(201).json({ status: "Flashcard created" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
