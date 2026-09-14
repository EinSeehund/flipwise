import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

export default function FlashcardList({
  flashcards,
  isLoading,
  error,
  collections,
  collectionsIsLoading,
  collectionsFetchError,
  onToggleToast,
}) {
  if (isLoading || collectionsIsLoading) {
    return <p>Loading...</p>;
  }

  if (error || collectionsFetchError) {
    return <p>Failed to fetch ressources...</p>;
  }

  return (
    <StyledList>
      {flashcards.length === 0 ? (
        <p>There are no flashcards, yet. Start by adding some new ones!</p>
      ) : (
        flashcards.map((flashcard) => (
          <li key={flashcard._id}>
            <Flashcard
              flashcardObject={flashcard}
              collections={collections}
              onToggleToast={onToggleToast}
            />
          </li>
        ))
      )}
    </StyledList>
  );
}

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 100px;
`;
