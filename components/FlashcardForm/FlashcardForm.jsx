import { useState } from "react";
import styled from "styled-components";
import useSWR, { useSWRConfig } from "swr";

export default function FlashcardForm({
  isEditing,
  flashcardObject,
  onToggleEdit,
}) {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState(null);

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
    <StyledForm onSubmit={handleSubmit}>
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
        name="collection"
        id="collection"
        defaultValue={isEditing ? flashcardObject.collection : ""}
        required
      >
        <option value="">-- Please select an option --</option>
        <option value="Art">Art</option>
        <option value="Biology">Biology</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Geography">Geography</option>
        <option value="Math">Math</option>
        <option value="Music">Music</option>
        <option value="Physics">Physics</option>
        <option value="Technology">Technology</option>
      </StyledSelect>
      {error && <StyledError role="alert">Error: {error}</StyledError>}
      <StyledSubmitButton>{isEditing ? "Update" : "Create"}</StyledSubmitButton>
      {isEditing && (
        <StyledCancelButton type="button" onClick={onToggleEdit}>
          Cancel
        </StyledCancelButton>
      )}
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 400px;
  margin-bottom: 32px;
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
