import styled from "styled-components";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function FlashcardForm() {
  const { mutate } = useSWR("/api/flashcards", fetcher);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    const response = await fetch("/api/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    if (response.ok) {
      mutate();
    }

    event.target.reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Create a new flashcard</h2>
      <StyledLabel htmlFor="question">Question</StyledLabel>
      <StyledTextarea
        name="question"
        id="question"
        placeholder="Enter your question..."
        required
      ></StyledTextarea>
      <StyledLabel htmlFor="answer">Answer</StyledLabel>
      <StyledTextarea
        name="answer"
        id="answer"
        placeholder="Enter the answer..."
        required
      ></StyledTextarea>
      <StyledLabel htmlFor="collection">Collection</StyledLabel>
      <StyledSelect name="collection" id="collection" required>
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
      <StyledButton>Create</StyledButton>
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

const StyledButton = styled.button`
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
