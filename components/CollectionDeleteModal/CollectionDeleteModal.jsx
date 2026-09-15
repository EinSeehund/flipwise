import { useState } from "react";
import styled from "styled-components";
import { mutate } from "swr";

export default function CollectionDeleteModal({
  onClose,
  collectionId,
  handleFilter,
}) {
  const [error, setError] = useState(null);

  async function handleDelete(id) {
    setError(null);
    try {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.error || "Unable to delete flashcard");
      }

      if (response.ok) {
        await mutate("/api/flashcards");
        await mutate("/api/collections");
        handleFilter("");
        onClose();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <ModalContainer>
      <ContentWrapper>
        <h3>WARNING!</h3>
        <p>
          Deleting this collection will permanently <b>delete all cards</b> that
          belong to it. This action cannot be undone.
          <br />
          <br />
          Are you sure, you want to delete it?
        </p>
        <ConfirmButton onClick={() => handleDelete(collectionId)}>
          Yes, delete!
        </ConfirmButton>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        {error && <p>{error}</p>}
      </ContentWrapper>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.section`
  background-color: white;
  width: 90%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
`;

const ConfirmButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 8px 16px;
  margin-right: 16px;
  border-radius: 8px;
  background-color: #c94a4a;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const CancelButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 8px 16px;
  border-radius: 8px;
  background: none;
  color: #5f5fd2;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
