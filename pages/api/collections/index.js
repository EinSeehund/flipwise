import dbConnect from "@/db/connect";
import FlashcardCollection from "@/db/models/FlashcardCollection";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ error: "Database connection failed" });
  }

  if (request.method === "GET") {
    try {
      const collections = await FlashcardCollection.find();
      return response.status(200).json(collections);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error retrieving collections..." });
    }
  }

  if (request.method === "POST") {
    try {
      const collection = await FlashcardCollection.create(request.body);
      return response
        .status(201)
        .json({ status: "Collection created", collection });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
