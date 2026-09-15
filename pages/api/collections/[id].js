import dbConnect from "@/db/connect";
import FlashcardCollection from "@/db/models/FlashcardCollection";

export default async function handler(request, response) {
  const { id } = request.query;

  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ error: "Database connection failed" });
  }

  if (request.method === "PUT") {
    try {
      const updatedCollection = await FlashcardCollection.findByIdAndUpdate(
        id,
        request.body
      );
      if (!updatedCollection) {
        return response.status(404).json({ error: "Collection not found" });
      }
      return response.status(200).json({ status: `Collection ${id} updated!` });
    } catch (error) {
      return response.status(500).json({ error: "Error updating collection" });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
