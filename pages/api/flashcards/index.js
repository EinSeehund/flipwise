import dbConnect from "@/db/connect";
import Flashcard from "@/db/models/Flashcard";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const flashcards = await Flashcard.find();
    return response.status(200).json(flashcards);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
