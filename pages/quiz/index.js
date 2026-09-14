import CollectionTag from "@/components/CollectionTag/CollectionTag";
import Flashcard from "@/components/Flashcard/Flashcard";
import { useState } from "react";
import styled from "styled-components";
import fisherYatesShuffle from "@/utils/fisherYatesShuffle";

export default function QuizPage({
  flashcards,
  collections,
  collectionsIsLoading,
  collectionsFetchError,
}) {
  const [currentScreen, setCurrentScreen] = useState("setup");
  const [selectedTags, setSelectedTags] = useState([]);
  const [quizState, setQuizState] = useState({
    currentCardIndex: 0,
    correctCards: 0,
    cardFlipped: false,
  });
  const [quizCards, setQuizCards] = useState([]);

  if (collectionsIsLoading) {
    return <p>Loading collections...</p>;
  }

  if (collectionsFetchError) {
    return <p>Error: {collectionsFetchError.message}</p>;
  }

  function handleToggleTag(collectionId) {
    if (selectedTags.includes(collectionId)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== collectionId));
    } else {
      setSelectedTags([...selectedTags, collectionId]);
    }
  }

  function handleSelectAll() {
    setSelectedTags(collections.map((collection) => collection._id));
  }

  function handleSelectNone() {
    setSelectedTags([]);
  }

  function handleStartQuiz() {
    const cardsForQuiz = fisherYatesShuffle(
      flashcards.filter((card) => selectedTags.includes(card.collection_id))
    );

    if (cardsForQuiz.length === 0) {
      alert("There are no cards in the selected collections");
      return;
    }

    setQuizCards(cardsForQuiz);
    setCurrentScreen("quizmode");
  }

  function handleFlipCard() {
    setQuizState((prev) => ({
      ...prev,
      cardFlipped: true,
    }));
  }

  function handleNextCard(correctAnswer) {
    if (quizState.currentCardIndex < quizCards.length - 1) {
      setQuizState((prev) => ({
        currentCardIndex: prev.currentCardIndex + 1,
        correctCards: correctAnswer ? prev.correctCards + 1 : prev.correctCards,
        cardFlipped: false,
      }));
    } else {
      setQuizState((prev) => ({
        ...prev,
        correctCards: correctAnswer ? prev.correctCards + 1 : prev.correctCards,
        cardFlipped: false,
      }));
      setCurrentScreen("result");
    }
  }

  function handleRestart() {
    setCurrentScreen("setup");
    setQuizState({
      currentCardIndex: 0,
      correctCards: 0,
      cardFlipped: false,
    });
    setSelectedTags([]);
    setQuizCards([]);
  }

  return (
    <main>
      {currentScreen === "setup" && (
        <>
          <TagContainer>
            {collections.map((collection) => (
              <CollectionTag
                key={collection._id}
                collectionId={collection._id}
                collectionTitle={collection.collectionTitle}
                colorDark={collection.colorDark}
                colorLight={collection.colorLight}
                active={selectedTags.includes(collection._id)}
                onToggleTag={handleToggleTag}
              />
            ))}
          </TagContainer>
          <BulkSelectContainer>
            <BulkSelect onClick={handleSelectAll}>select all</BulkSelect>
            <BulkSelect onClick={handleSelectNone}>select none</BulkSelect>
          </BulkSelectContainer>
          <StartButton
            onClick={handleStartQuiz}
            disabled={selectedTags.length === 0}
          >
            Start Quiz!
          </StartButton>
        </>
      )}
      {currentScreen === "quizmode" && (
        <QuizContainer>
          <h3>
            {quizState.currentCardIndex + 1} / {quizCards.length}
          </h3>
          <Flashcard
            key={quizState.currentCardIndex}
            flashcardObject={quizCards[quizState.currentCardIndex]}
            collections={collections}
            quizModeActive={true}
            onFlip={handleFlipCard}
          />
          <QuizButtonContainer $visible={quizState.cardFlipped}>
            <QuizButton
              aria-label="Inorrect answer"
              onClick={() => handleNextCard(false)}
            >
              ❌
            </QuizButton>
            <QuizButton
              aria-label="Correct answer"
              onClick={() => handleNextCard(true)}
            >
              ✅
            </QuizButton>
          </QuizButtonContainer>
        </QuizContainer>
      )}
      {currentScreen === "result" && (
        <ResultContainer>
          <ResultHeadline>Finished!!!</ResultHeadline>
          <ResultPartyPopper>🎉</ResultPartyPopper>
          <ResultStatistic>
            You&apos;ve answered {quizState.correctCards} of {quizCards.length}{" "}
            flashcards correctly!
          </ResultStatistic>
          <StartButton onClick={handleRestart}>Restart</StartButton>
        </ResultContainer>
      )}
    </main>
  );
}

const TagContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
  margin-bottom: 25px;
`;

const BulkSelectContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 64px;
`;

const BulkSelect = styled.button`
  font-size: inherit;
  cursor: pointer;
  border: none;
  border-bottom: 1px solid #4b4b4b;
  background: none;
  color: #4b4b4b;
  padding: 0;
  margin-left: 16px;
`;

const StartButton = styled.button`
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
  &:disabled {
    background-color: #9d9df0;
    cursor: not-allowed;
  }
`;

const QuizContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuizButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 32px;
  opacity: ${({ $visible }) => ($visible ? 1.0 : 0.0)};
`;

const QuizButton = styled.button`
  width: 80px;
  height: 80px;
  font-size: 2rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const ResultContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultHeadline = styled.h2`
  font-size: 2rem;
`;

const ResultPartyPopper = styled.p`
  margin: 0;
  font-size: 4rem;
`;

const ResultStatistic = styled.p`
  max-width: 70%;
  text-align: center;
`;
