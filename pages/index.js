import CollectionDeleteModal from "@/components/CollectionDeleteModal/CollectionDeleteModal";
import CollectionFilter from "@/components/CollectionFilter/CollectionFilter";
import CollectionModal from "@/components/CollectionModal/CollectionModal";
import FlashcardForm from "@/components/FlashcardForm/FlashcardForm";
import FlashcardList from "@/components/FlashcardList/FlashcardList";
import ToastMessage from "@/components/ToastMessage/ToastMessage";
import { useState } from "react";
import styled from "styled-components";

export default function HomePage({
  flashcards,
  isLoading,
  error,
  collections,
  collectionsIsLoading,
  collectionsFetchError,
}) {
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showCollectionDeleteModal, setShowCollectionDeleteModal] =
    useState(false);
  const [filterById, setFilterById] = useState("");
  const [editingCollection, setEditingCollection] = useState(null);

  function toggleNewCardForm() {
    setShowNewCardForm(!showNewCardForm);
  }

  function toggleToast(toastVisible) {
    setShowToast(toastVisible);
  }

  function openNewCollection() {
    setEditingCollection(null);
    setShowCollectionModal(true);
  }

  function openEditCollection() {
    const selectedCollection = collections.find(
      (collection) => collection._id === filterById
    );

    if (!selectedCollection) {
      return;
    }

    setEditingCollection(selectedCollection);
    setShowCollectionModal(true);
  }

  function closeCollectionModal() {
    setEditingCollection(null);
    setShowCollectionModal(false);
  }

  function toggleCollectionDeleteModal() {
    setShowCollectionDeleteModal(!showCollectionDeleteModal);
  }

  function handleFilter(collectionId) {
    setFilterById(collectionId);
  }

  return (
    <main>
      {showToast && <ToastMessage text="Flashcard successfully deleted!" />}
      {showCollectionModal && (
        <CollectionModal
          onClose={closeCollectionModal}
          handleFilter={handleFilter}
          editingCollection={editingCollection}
        />
      )}
      {showCollectionDeleteModal && (
        <CollectionDeleteModal
          onClose={toggleCollectionDeleteModal}
          collectionId={filterById}
          handleFilter={handleFilter}
        />
      )}
      <CollectionFilter
        collections={collections}
        collectionsIsLoading={collectionsIsLoading}
        collectionsFetchError={collectionsFetchError}
        filterById={filterById}
        onFilter={handleFilter}
        onNewCollection={openNewCollection}
        onEditCollection={openEditCollection}
        onDeleteCollection={toggleCollectionDeleteModal}
      />
      {showNewCardForm && (
        <FlashcardForm
          isEditing={false}
          collections={collections}
          collectionsIsLoading={collectionsIsLoading}
          collectionsFetchError={collectionsFetchError}
          onToggleForm={toggleNewCardForm}
        />
      )}
      {!showNewCardForm && (
        <StyledButton onClick={toggleNewCardForm}>
          Add New Flashcard
        </StyledButton>
      )}
      <FlashcardList
        flashcards={
          filterById
            ? flashcards.filter((card) => card.collection_id === filterById)
            : flashcards
        }
        isLoading={isLoading}
        error={error}
        collections={collections}
        collectionsIsLoading={collectionsIsLoading}
        collectionsFetchError={collectionsFetchError}
        onToggleToast={toggleToast}
      />
    </main>
  );
}

const StyledButton = styled.button`
  width: 100%;
  max-width: 400px;
  font-family: inherit;
  font-size: inherit;
  padding: 16px 32px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: #5f5fd2;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
