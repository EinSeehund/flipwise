import CollectionFilter from "@/components/CollectionFilter/CollectionFilter";
import CollectionModal from "@/components/CollectionModal/CollectionModal";
import FlashcardForm from "@/components/FlashcardForm/FlashcardForm";
import FlashcardList from "@/components/FlashcardList/FlashcardList";
import ToastMessage from "@/components/ToastMessage/ToastMessage";
import { useState } from "react";

export default function HomePage({
  flashcards,
  isLoading,
  error,
  collections,
  collectionsIsLoading,
  collectionsFetchError,
}) {
  const [showToast, setShowToast] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [filterById, setFilterById] = useState("");
  const [editingCollection, setEditingCollection] = useState(null);

  function toggleToast(toastVisible) {
    setShowToast(toastVisible);
  }

  function toggleCollectionModal() {
    setShowCollectionModal(!showCollectionModal);
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
      <FlashcardForm
        isEditing={false}
        collections={collections}
        collectionsIsLoading={collectionsIsLoading}
        collectionsFetchError={collectionsFetchError}
      />
      <CollectionFilter
        collections={collections}
        collectionsIsLoading={collectionsIsLoading}
        collectionsFetchError={collectionsFetchError}
        filterById={filterById}
        onFilter={handleFilter}
        onToggleModal={toggleCollectionModal}
        onNewCollection={openNewCollection}
        onEditCollection={openEditCollection}
      />
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
