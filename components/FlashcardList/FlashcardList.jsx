import { useState } from "react";
import Flashcard from "../Flashcard/Flashcard";
import CollectionAccordion from "../CollectionAccordion/CollectionAccordion";
import styled from "styled-components";

export default function FlashcardList({
  flashcards,
  isLoading,
  error,
  collections,
  collectionsIsLoading,
  collectionsFetchError,
  onToggleToast,
}) {
  // Ids of collections the user has toggled away from their default state.
  const [toggledIds, setToggledIds] = useState([]);

  if (isLoading || collectionsIsLoading) {
    return <p>Loading...</p>;
  }

  if (error || collectionsFetchError) {
    return <p>Failed to fetch ressources...</p>;
  }

  if (flashcards.length === 0) {
    return <p>There are no flashcards, yet. Start by adding some new ones!</p>;
  }

  const groups = collections
    .map((collection) => ({
      collection,
      cards: flashcards.filter((card) => card.collection_id === collection._id),
    }))
    .filter((group) => group.cards.length > 0);

  // A single collection (e.g. when filtered) is expanded by default.
  const openByDefault = groups.length === 1;

  function handleToggle(collectionId) {
    setToggledIds((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  }

  return (
    <StyledAccordionList>
      {groups.map(({ collection, cards }) => (
        <li key={collection._id}>
          <CollectionAccordion
            collection={collection}
            cardCount={cards.length}
            isOpen={openByDefault !== toggledIds.includes(collection._id)}
            onToggle={() => handleToggle(collection._id)}
          >
            <StyledCardList>
              {cards.map((flashcard) => (
                <li key={flashcard._id}>
                  <Flashcard
                    flashcardObject={flashcard}
                    collections={collections}
                    onToggleToast={onToggleToast}
                  />
                </li>
              ))}
            </StyledCardList>
          </CollectionAccordion>
        </li>
      ))}
    </StyledAccordionList>
  );
}

const StyledAccordionList = styled.ul`
  width: 100%;
  max-width: 400px;
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0 100px;
`;
const StyledCardList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
