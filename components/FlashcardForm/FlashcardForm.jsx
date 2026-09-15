import { useState } from "react";
import styled from "styled-components";
import { useSWRConfig } from "swr";

export default function FlashcardForm({
  isEditing,
  flashcardObject,
  onToggleEdit,
  onToggleForm,
  collections,
  collectionsIsLoading,
  collectionsFetchError,
}) {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState(null);

  if (collectionsIsLoading) {
    return <p>Loading collections...</p>;
  }

  if (collectionsFetchError) {
    return <p>Error: {collectionsFetchError.message}</p>;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    let response;

    try {
      if (isEditing) {
        response = await fetch(`/api/flashcards/${flashcardObject._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        });
      } else {
        response = await fetch("/api/flashcards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
        });
      }

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.error || "Unable to save flashcard");
      }

      if (response.ok) {
        mutate("/api/flashcards");
        if (isEditing) onToggleEdit();
        else event.target.reset();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit} $isEditing={isEditing}>
      <h2>{isEditing ? "Edit flashcard" : "Create a new flashcard"}</h2>
      <StyledLabel htmlFor="question">Question</StyledLabel>
      <StyledTextarea
        name="question"
        id="question"
        defaultValue={isEditing ? flashcardObject.question : ""}
        placeholder="Enter your question..."
        required
      ></StyledTextarea>
      <StyledLabel htmlFor="answer">Answer</StyledLabel>
      <StyledTextarea
        name="answer"
        id="answer"
        defaultValue={isEditing ? flashcardObject.answer : ""}
        placeholder="Enter the answer..."
        required
      ></StyledTextarea>
      <StyledLabel htmlFor="collection">Collection</StyledLabel>
      <StyledSelect
        name="collection_id"
        id="collection"
        defaultValue={isEditing ? flashcardObject.collection_id : ""}
        required
      >
        <option value="">-- Please select an option --</option>
        {collections.map((collection) => (
          <option value={collection._id} key={collection._id}>
            {collection.collectionTitle}
          </option>
        ))}
      </StyledSelect>
      {error && <StyledError role="alert">Error: {error}</StyledError>}
      <StyledSubmitButton>{isEditing ? "Update" : "Create"}</StyledSubmitButton>
      
        <StyledCancelButton type="button" onClick={isEditing ? onToggleEdit : onToggleForm}>
          Cancel
        </StyledCancelButton>
      
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 400px;
  padding-bottom: 32px;
  margin-bottom: ${({ $isEditing }) => !$isEditing && "32px"};
  border-bottom: ${({ $isEditing }) => !$isEditing && "1px dotted gray"};
`;
const StyledTextarea = styled.textarea`
  width: 80%;
  font-family: inherit;
  font-size: inherit;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 8px;
  resize: none;
`;
const StyledLabel = styled.label`
  margin-bottom: 4px;
`;
const StyledSelect = styled.select`
  width: 80%;
  font-family: inherit;
  font-size: inherit;
  padding: 8px;
  margin-bottom: 32px;
  border-radius: 8px;
`;
const StyledSubmitButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 16px 32px;
  border-radius: 8px;
  background-color: #5f5fd2;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
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
const StyledError = styled.p`
  color: #b42318;
  margin: 0 0 16px;
`;
