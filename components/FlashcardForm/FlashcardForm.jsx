import styled from "styled-components";

export default function FlashcardForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Create a new flashcard</h2>
      <label htmlFor="question">Question</label>
      <textarea
        name="question"
        id="question"
        placeholder="Enter your question..."
        required
      ></textarea>
      <label htmlFor="answer">Answer</label>
      <textarea
        name="answer"
        id="answer"
        placeholder="Enter the answer..."
        required
      ></textarea>
      <label htmlFor="collection">Collection</label>
      <select name="collection" id="collection" required>
        <option value="">-- Please select an option --</option>
        <option value="Art">Art</option>
        <option value="Biology">Biology</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Geography">Geography</option>
        <option value="Math">Math</option>
        <option value="Music">Music</option>
        <option value="Physics">Physics</option>
        <option value="Technology">Technology</option>
      </select>
      <button>Create</button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 400px;
`;
