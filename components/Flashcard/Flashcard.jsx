import styled from "styled-components";

export default function Flashcard({ flashcardObject }) {
  return (
    <StyledFlashcard $flashcardObject={flashcardObject}>
      <StyledCollectionTag>{flashcardObject.collection}</StyledCollectionTag>
      <StyledFlashcardText>
        <StyledQATag>Question:</StyledQATag>
        <p>{flashcardObject.question}</p>
        <StyledQATag>Answer:</StyledQATag>
        <p>{flashcardObject.answer}</p>
      </StyledFlashcardText>
    </StyledFlashcard>
  );
}

const StyledFlashcard = styled.article`
  background-color: ${({ $flashcardObject }) => {
    switch ($flashcardObject.collection) {
      case "Biology":
        return "green";
        break;
      case "Geography":
        return "orange";
        break;
      case "Technology":
        return "lightblue";
        break;
      case "Chemistry":
        return "purple";
        break;
      case "Physics":
        return "yellow";
        break;
      case "Art":
        return "pink";
        break;
      case "Music":
        return "red";
        break;
      case "Math":
        return "brown";
        break;
      default:
        return "gray";
    }
    if ($flashcardObject?.collection === "Biology") {
      return "#000000";
    }
    return "#ffffff";
  }};
  padding: 10px;
  border-radius: 10px;
`;

const StyledCollectionTag = styled.p`
  margin: 0 0 10px 5px;
`;

const StyledFlashcardText = styled.section`
  padding: 10px;
  margin: 0;
  background-color: white;
  border-radius: 0 0 10px 10px;
`;

const StyledQATag = styled.p`
  font-size: 0.7rem;
`;
