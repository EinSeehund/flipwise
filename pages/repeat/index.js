import Flashcard from "@/components/Flashcard/Flashcard";
import fisherYatesShuffle from "@/utils/fisherYatesShuffle";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";

export default function RepeatPage({ collections }) {
  const [dayStats, setDayStats] = useLocalStorageState("dayStats", {
    defaultValue: {
      dateOfLastRepeat: "",
      totalCards: 0,
      wrongCards: 0,
      correctCards: 0,
      easyCards: 0,
    },
  });
  const [dueCards, setDueCards] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("setup");
  const [repeatState, setRepeatState] = useState({
    currentCardIndex: 0,
    wrongCards: 0,
    correctCards: 0,
    easyCards: 0,
    cardFlipped: false,
  });

  // Only for testing, will not be merged into main
  const [todaysDate, setTodaysDate] = useState("2026-09-17T23:59");

  // The query parameter "todaysdate" is only passed for testing and will be removed before merging into main
  const { data, isLoading, error } = useSWR(
    `/api/flashcards?due=true&todaysdate=${todaysDate}`
  );

  useEffect(() => {
    if (dayStats.dateOfLastRepeat === new Date().toLocaleDateString()) {
      setCurrentScreen("result");
    }
  }, [dayStats.dateOfLastRepeat]);

  useEffect(() => {
    setDueCards(data);
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Failed to fetch cards</p>;
  }

  // This handler is for testing only and will be removed before merging into main
  function handleDateChange(event) {
    setTodaysDate(event.target.value);
  }

  function startRepeating() {
    setDueCards((prev) => fisherYatesShuffle(prev));
    setCurrentScreen("repeating");
  }

  function handleFlip() {
    setRepeatState((prev) => ({
      ...prev,
      cardFlipped: true,
    }));
  }

  function updateDayStats(finalEvaluation) {
    setDayStats({
      dateOfLastRepeat: new Date().toLocaleDateString(),
      totalCards: dueCards.length,
      wrongCards: repeatState.wrongCards + (finalEvaluation === 1 ? 1 : 0),
      correctCards: repeatState.correctCards + (finalEvaluation === 3 ? 1 : 0),
      easyCards: repeatState.easyCards + (finalEvaluation === 5 ? 1 : 0),
    });
  }

  async function handleNextCard(evaluation) {
    const response = await fetch(
      `/api/flashcards/${dueCards[repeatState.currentCardIndex]._id}/review`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // todaysDate is only passed for testing purposes and will be removed before merging into main
        body: JSON.stringify({ evaluation, todaysDate }),
      }
    );

    // Keeping this console.log for testing purposes, will not be merged into main
    const updatedFlashcard = await response.json();
    console.log("New due date of this card is ", updatedFlashcard.dueDate);

    if (repeatState.currentCardIndex < dueCards.length - 1) {
      setRepeatState((prev) => ({
        currentCardIndex: prev.currentCardIndex + 1,
        wrongCards: evaluation === 1 ? prev.wrongCards + 1 : prev.wrongCards,
        correctCards:
          evaluation === 3 ? prev.correctCards + 1 : prev.correctCards,
        easyCards: evaluation === 5 ? prev.easyCards + 1 : prev.easyCards,
        cardFlipped: false,
      }));
    } else {
      setRepeatState((prev) => ({
        ...prev,
        wrongCards: evaluation === 1 ? prev.wrongCards + 1 : prev.wrongCards,
        correctCards:
          evaluation === 3 ? prev.correctCards + 1 : prev.correctCards,
        easyCards: evaluation === 5 ? prev.easyCards + 1 : prev.easyCards,
        cardFlipped: false,
      }));
      updateDayStats(evaluation);
      setCurrentScreen("result");
    }
  }

  return (
    <main>
      {currentScreen === "setup" && (
        <ContentWrapper>
          {dueCards?.length === 0 ? (
            <>
              <TextLarge>
                No flashcards to repeat today! <br />
                <br />
              </TextLarge>
              <EmojiWrapper>☕</EmojiWrapper>
              <TextMedium>Lean back and check in another day.</TextMedium>
            </>
          ) : (
            <>
              <TextLarge>
                {dueCards?.length} flashcards due for repetition today!
              </TextLarge>
              <EmojiWrapper>🗃️</EmojiWrapper>
            </>
          )}
          {dueCards?.length !== 0 && (
            <StartButton onClick={startRepeating}>Repeat now!</StartButton>
          )}

          {/* The date input is for testing only, will not be merged into main */}
          <DateSimulator>
            <p>
              Simulate a different date. Only for testing purposes, will not be
              merged into main:
            </p>
            <input
              type="datetime-local"
              value={todaysDate}
              onChange={handleDateChange}
            />
          </DateSimulator>
        </ContentWrapper>
      )}
      {currentScreen === "repeating" && (
        <ContentWrapper>
          <Flashcard
            key={repeatState.currentCardIndex}
            flashcardObject={dueCards[repeatState.currentCardIndex]}
            collections={collections}
            quizModeActive={true}
            onFlip={handleFlip}
          />
          <EvaluationButtonContainer $visible={repeatState.cardFlipped}>
            <EvaluationButton onClick={() => handleNextCard(1)}>
              <EvaluationButtonEmoji>❌</EvaluationButtonEmoji>
              <EvaluationButtonText>Wrong</EvaluationButtonText>
            </EvaluationButton>
            <EvaluationButton onClick={() => handleNextCard(3)}>
              <EvaluationButtonEmoji>👍</EvaluationButtonEmoji>
              <EvaluationButtonText>Correct</EvaluationButtonText>
            </EvaluationButton>
            <EvaluationButton onClick={() => handleNextCard(5)}>
              <EvaluationButtonEmoji>💪</EvaluationButtonEmoji>
              <EvaluationButtonText>Easy</EvaluationButtonText>
            </EvaluationButton>
          </EvaluationButtonContainer>
        </ContentWrapper>
      )}
      {currentScreen === "result" && (
        <ContentWrapper>
          <TextLarge>Finished!!!</TextLarge>
          <EmojiWrapper>🏁</EmojiWrapper>
          <TextMedium>
            You&apos;ve repeated all due flashcards for today!
            <br />
            <br /> Here&apos;s how you did:
          </TextMedium>
          <ResultContainer>
            <ResultWrapper>
              <ResultPercent>
                {Math.floor((100 / dayStats.totalCards) * dayStats.wrongCards)}%
              </ResultPercent>
              <ResultEmoji>❌</ResultEmoji>
              <ResultText>Wrong</ResultText>
            </ResultWrapper>
            <ResultWrapper>
              <ResultPercent>
                {Math.floor(
                  (100 / dayStats.totalCards) * dayStats.correctCards
                )}
                %
              </ResultPercent>
              <ResultEmoji>👍</ResultEmoji>
              <ResultText>Correct</ResultText>
            </ResultWrapper>
            <ResultWrapper>
              <ResultPercent>
                {Math.floor((100 / dayStats.totalCards) * dayStats.easyCards)}%
              </ResultPercent>
              <ResultEmoji>💪</ResultEmoji>
              <ResultText>Easy</ResultText>
            </ResultWrapper>
          </ResultContainer>
        </ContentWrapper>
      )}
    </main>
  );
}

// Only for testing, will be removed
const DateSimulator = styled.div`
  position: fixed;
  max-width: 300px;
  bottom: 80px;
  > p {
    font-size: small;
  }
`;

const ContentWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextLarge = styled.h2`
  margin: 0;
  max-width: 300px;
  text-align: center;
`;

const TextMedium = styled.p`
  font-size: 1.3rem;
  max-width: 300px;
  text-align: center;
`;

const EmojiWrapper = styled.p`
  margin: 0;
  font-size: 7rem;
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

const EvaluationButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 32px;
  opacity: ${({ $visible }) => ($visible ? 1.0 : 0.0)};
`;

const EvaluationButton = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const EvaluationButtonEmoji = styled.p`
  font-size: 1.7rem;
  margin: 0;
`;

const EvaluationButtonText = styled.p`
  font-size: 0.6rem;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
`;

const ResultContainer = styled.div`
  width: 90%;
  max-width: 400px;
  display: flex;
  justify-content: space-around;
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultEmoji = styled.p`
  font-size: 2rem;
  margin: 0 0 4px;
`;

const ResultText = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
`;

const ResultPercent = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0;
`;
