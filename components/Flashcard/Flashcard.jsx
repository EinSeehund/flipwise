import styled from "styled-components";
import { useState } from "react";
import getCardColors from "@/utils/getCardColors";
import FlashcardForm from "../FlashcardForm/FlashcardForm";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

export default function Flashcard({
  flashcardObject,
  collections,
  onToggleToast,
  quizModeActive,
  onFlip,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const currentCollection = collections.find(
    (collection) => collection._id === flashcardObject.collection_id
  );

  const frontColors = getCardColors(currentCollection.colorDark);
  const backColors = getCardColors(currentCollection.colorLight);

  function handleFlip() {
    if (quizModeActive) {
      onFlip();
      setIsFlipped(true);
    } else {
      setIsFlipped(!isFlipped);
    }
  }

  function onToggleEdit() {
    setEditActive(!editActive);
  }

  function onToggleDeleteConfirmation() {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  }

  return (
    <>
      <StyledFlashcardContainer onClick={handleFlip}>
        <StyledFlashcard $isFlipped={isFlipped}>
          <StyledFlashcardFront $colors={frontColors}>
            <StyledCardHeader>
              <StyledCollectionTag>
                {currentCollection.collectionTitle}
              </StyledCollectionTag>
              <StyledSideLabel>Question</StyledSideLabel>
            </StyledCardHeader>
            <StyledCardText>{flashcardObject.question}</StyledCardText>
            <StyledFlipHint>Tap to reveal answer</StyledFlipHint>
          </StyledFlashcardFront>
          <StyledFlashcardBack $colors={backColors}>
            <StyledCardHeader>
              <StyledCollectionTag>
                {currentCollection.collectionTitle}
              </StyledCollectionTag>
              <StyledSideLabel>Answer</StyledSideLabel>
            </StyledCardHeader>
            <StyledCardText>{flashcardObject.answer}</StyledCardText>
          </StyledFlashcardBack>
        </StyledFlashcard>
      </StyledFlashcardContainer>
      <StyledButtonContainer>
        {!editActive && !quizModeActive && (
          <StyledEditButton aria-label="Edit flashcard" onClick={onToggleEdit}>
            ✎
          </StyledEditButton>
        )}
        {!editActive && !quizModeActive && (
          <StyledDeleteButton
            aria-label="Delete flashcard"
            onClick={onToggleDeleteConfirmation}
          >
            ✖
          </StyledDeleteButton>
        )}
      </StyledButtonContainer>
      {editActive && (
        <FlashcardForm
          isEditing={true}
          flashcardObject={flashcardObject}
          onToggleEdit={onToggleEdit}
          collections={collections}
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

const StyledFlashcardContainer = styled.article`
  width: 90vw;
  max-width: 400px;
  cursor: pointer;
  perspective: 1200px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;
const StyledFlashcard = styled.div`
  display: grid;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) =>
    $isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;
const FlashcardFace = styled.div`
  grid-area: 1 / 1;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 220px;
  padding: 20px;
  border-radius: 20px;
  color: ${({ $colors }) => $colors.textColor};
  background: ${({ $colors }) =>
    `linear-gradient(135deg, ${$colors.background}, ${$colors.gradientEnd})`};
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 12px 32px -8px rgba(0, 0, 0, 0.25);
`;
const StyledFlashcardFront = styled(FlashcardFace)``;
const StyledFlashcardBack = styled(FlashcardFace)`
  transform: rotateY(180deg);
`;
const StyledCardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;
const StyledCollectionTag = styled.span`
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid currentColor;
  font-size: 0.8rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const StyledSideLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;
const StyledCardText = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;
const StyledFlipHint = styled.span`
  align-self: center;
  font-size: 0.75rem;
`;
const StyledButtonContainer = styled.div`
  width: 90vw;
  max-width: 400px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;
const StyledIconButton = styled.button`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
`;
const StyledEditButton = styled(StyledIconButton)`
  color: #4b4b4b;

  &:hover {
    background-color: #f2f2f2;
  }
`;
const StyledDeleteButton = styled(StyledIconButton)`
  color: #dc1a1a;

  &:hover {
    background-color: #dc1a1a;
    border-color: #dc1a1a;
    color: white;
  }
`;
