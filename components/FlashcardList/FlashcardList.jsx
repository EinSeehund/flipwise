import useSWR from "swr";
import Flashcard from "../Flashcard/Flashcard";
import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function FlashcardList({ flashcards, isLoading, error }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
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
