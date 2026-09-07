import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  const { id } = request.query;

  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ error: "Database connection failed" });
  }

  if (request.method === "PUT") {
    try {
      const updatedFlashcard = await Flashcard.findByIdAndUpdate(
        id,
        request.body
      );
      if (!updatedFlashcard) {
        return response.status(404).json({ error: "Flashcard not found" });
      }
      return response.status(200).json({ status: `Flashcard ${id} updated!` });
    } catch (error) {
      return response.status(500).json({ error: "Error updating flashcard" });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
