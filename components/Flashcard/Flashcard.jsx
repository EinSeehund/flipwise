import styled from "styled-components";
import { useState } from "react";
import FlashcardForm from "../FlashcardForm/FlashcardForm";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

export default function Flashcard({ flashcardObject, onToggleToast }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  function onToggleEdit() {
    setEditActive(!editActive);
  }

  function onToggleDeleteConfirmation() {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  }

  return (
    <>
      <StyledFlashcardContainer onClick={() => setIsFlipped(!isFlipped)}>
        <StyledFlashcard $isFlipped={isFlipped}>
          <StyledFlashcardFront $flashcardObject={flashcardObject}>
            <StyledCollectionTag>
              {flashcardObject.collection}
            </StyledCollectionTag>
            <StyledFlashcardText>
              <StyledQATag>❓</StyledQATag>
              <p>{flashcardObject.question}</p>
            </StyledFlashcardText>
          </StyledFlashcardFront>
          <StyledFlashcardBack $flashcardObject={flashcardObject}>
            <StyledCollectionTag>
              {flashcardObject.collection}
            </StyledCollectionTag>
            <StyledFlashcardText>
              <StyledQATag>✔️</StyledQATag>
              <p>{flashcardObject.answer}</p>
            </StyledFlashcardText>
          </StyledFlashcardBack>
        </StyledFlashcard>
      </StyledFlashcardContainer>
      <StyledButtonContainer>
        {!editActive && (
          <StyledEditButton aria-label="Edit flashcard" onClick={onToggleEdit}>
            ✎
          </StyledEditButton>
        )}
        <StyledDeleteButton
          aria-label="Delete flashcard"
          onClick={onToggleDeleteConfirmation}
        >
          ✖
        </StyledDeleteButton>
      </StyledButtonContainer>
      {editActive && (
        <FlashcardForm
          isEditing={true}
          flashcardObject={flashcardObject}
          onToggleEdit={onToggleEdit}
        />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmationDialog
          onToggleDeleteConfirmation={onToggleDeleteConfirmation}
          flashcardId={flashcardObject._id}
          onToggleToast={onToggleToast}
        />
      )}
    </>
  );
}

const StyledFlashcard = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  border: 1px solid #e4e2e2;
  padding: 4px;
  border-radius: 10px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) =>
    $isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;
const StyledCollectionTag = styled.p`
  align-self: flex-start;
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 10px 5px;
  color: white;
`;
const StyledFlashcardText = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 10px;
  margin: 0;
  background-color: white;
  border-radius: 0 0 10px 10px;
`;
const StyledQATag = styled.div`
  font-size: 1.2rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  top: 10px;
  right: 12px;
  background-color: white;
`;
const StyledFlashcardContainer = styled.article`
  width: 90vw;
  max-width: 400px;
  cursor: pointer;
  perspective: 1000px;
`;
const FlashcardFace = styled.div`
  backface-visibility: hidden;
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
`;
const StyledFlashcardFront = styled(FlashcardFace)`
  font-size: 1.2rem;
  font-weight: 600;
  background: ${({ $flashcardObject }) => {
    switch ($flashcardObject.collection) {
      case "Biology":
        return "linear-gradient(135deg, #166534, #15803d)";
        break;
      case "Geography":
        return "linear-gradient(135deg, #c2410c, #ea580c)";
        break;
      case "Technology":
        return "linear-gradient(135deg, #0369a1, #0284c7)";
        break;
      case "Chemistry":
        return "linear-gradient(135deg, #7e22ce, #a21caf)";
        break;
      case "Physics":
        return "linear-gradient(135deg, #a16207, #ca8a04)";
        break;
      case "Art":
        return "linear-gradient(135deg, #be185d, #db2777)";
        break;
      case "Music":
        return "linear-gradient(135deg, #991b1b, #dc2626)";
        break;
      case "Math":
        return "linear-gradient(135deg, #78350f, #92400e)";
        break;
      default:
        return "linear-gradient(135deg, #374151, #4b5563)";
    }
  }};
`;
const StyledFlashcardBack = styled(FlashcardFace)`
  transform: rotateY(180deg);
  font-size: 1.2rem;
  font-weight: 400;
  background: ${({ $flashcardObject }) => {
    switch ($flashcardObject.collection) {
      case "Biology":
        return "linear-gradient(135deg, #16a34a, #22c55e)";
        break;
      case "Geography":
        return "linear-gradient(135deg, #ea580c, #f97316)";
        break;
      case "Technology":
        return "linear-gradient(135deg, #0284c7, #0ea5e9)";
        break;
      case "Chemistry":
        return "linear-gradient(135deg, #a855f7, #c026d3)";
        break;
      case "Physics":
        return "linear-gradient(135deg, #ca8a04, #eab308)";
        break;
      case "Art":
        return "linear-gradient(135deg, #db2777, #ec4899)";
        break;
      case "Music":
        return "linear-gradient(135deg, #dc2626, #ef4444)";
        break;
      case "Math":
        return "linear-gradient(135deg, #a16207, #b7791f)";
        break;
      default:
        return "linear-gradient(135deg, #4b5563, #6b7280)";
    }
  }};
`;
const StyledButtonContainer = styled.div`
  width: 97%;
  display: flex;
  justify-content: flex-end;
`;
const StyledEditButton = styled.button`
  font-size: 1.2rem;
  border: none;
  background-color: #605b5b;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-top: 8px;
  margin-right: 8px;
  &:hover {
    cursor: pointer;
    background-color: #7e7777;
  }
`;
const StyledDeleteButton = styled.button`
  font-size: 1.2rem;
  border: none;
  background-color: #dc1a1a;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-top: 8px;
  &:hover {
    cursor: pointer;
    background-color: #f34343;
  }
`;
