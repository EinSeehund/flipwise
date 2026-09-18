import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ error: "Database connection failed" });
  }

  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  if (!Array.isArray(request.body)) {
    return response.status(400).json({ message: "Wrong data type" });
  }

  if (request.body.length === 0) {
    return response.status(400).json({ message: "No data to insert" });
  }

  try {
    await Flashcard.insertMany(request.body);
    return response
      .status(201)
      .json({ status: "Flashcards successfully imported." });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}
