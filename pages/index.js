import FlashcardForm from "@/components/FlashcardForm/FlashcardForm";
import FlashcardList from "@/components/FlashcardList/FlashcardList";
import ToastMessage from "@/components/ToastMessage/ToastMessage";
import { useState } from "react";

export default function HomePage({ flashcards, isLoading, error }) {
  const [showToast, setShowToast] = useState(false);

  function toggleToast(toastVisible) {
    setShowToast(toastVisible);
  }

  return (
    <main>
      {showToast && <ToastMessage text="Flashcard successfully deleted!" />}
      <FlashcardForm isEditing={false} />
      <FlashcardList
        flashcards={flashcards}
        isLoading={isLoading}
        error={error}
        onToggleToast={toggleToast}
      />
    </main>
  );
}
