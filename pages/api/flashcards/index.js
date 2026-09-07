import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ error: "Database connection failed" });
  }

  if (request.method === "GET") {
    try {
      const flashcards = await Flashcard.find();
      return response.status(200).json(flashcards);
    } catch (error) {
      response.status(500).json({ error: "Error retrieving flashcards" });
    }
  }

  if (request.method === "POST") {
    try {
      await Flashcard.create(request.body);
      response.status(201).json({ status: "Flashcard created" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
