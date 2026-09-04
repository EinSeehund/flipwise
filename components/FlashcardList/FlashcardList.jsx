import useSWR from "swr";
import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function FlashcardList() {
  const {
    data: flashcards,
    isLoading,
    error,
  } = useSWR("/api/flashcards", fetcher);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <StyledList>
      {flashcards.map((flashcard) => (
        <li key={flashcard._id}>
          <Flashcard flashcardObject={flashcard} />
        </li>
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
