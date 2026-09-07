import FlashcardForm from "@/components/FlashcardForm/FlashcardForm";
import FlashcardList from "@/components/FlashcardList/FlashcardList";

export default function HomePage({ flashcards, isLoading, error }) {
  return (
    <main>
      <FlashcardForm isEditing={false} />
      <FlashcardList
        flashcards={flashcards}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
