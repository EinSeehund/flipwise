import { useState } from "react";
import styled from "styled-components";
import { useSWRConfig } from "swr";

export default function DeleteConfirmationDialog({
  onToggleDeleteConfirmation,
  flashcardId,
  onToggleToast,
}) {
  const [error, setError] = useState(null);

  const { mutate } = useSWRConfig();

  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/flashcards/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        mutate("/api/flashcards");
        onToggleToast(true);
        setTimeout(() => onToggleToast(false), 3000);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <StyledConfirmationDialog>
      <p>Sure, you want to delete this flashcard?</p>
      <div>
        <StyledCancelButton onClick={onToggleDeleteConfirmation}>
          Cancel
        </StyledCancelButton>
        <StyledConfirmButton onClick={() => handleDelete(flashcardId)}>
          Yes, delete
        </StyledConfirmButton>
      </div>
      {error && <p>Failed to delete flashcard</p>}
    </StyledConfirmationDialog>
  );
}

const StyledConfirmationDialog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 36px;

  > p {
    margin-bottom: 5px;
  }
`;
const StyledConfirmButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #dc1a1a;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #f34343;
  }
`;
const StyledCancelButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 16px 32px;
  border-radius: 8px;
  background: none;
  color: #5f5fd2;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
