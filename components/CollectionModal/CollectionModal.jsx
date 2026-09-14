import { useState } from "react";
import { useSWRConfig } from "swr";
import styled from "styled-components";
import { lighten, darken } from "polished";

export default function CollectionModal({ onClose, handleFilter }) {
  const { mutate } = useSWRConfig();
  const [titleInput, setTitleInput] = useState("");
  const [colorDarkInput, setColorDarkInput] = useState("#000000");
  const [colorLightInput, setColorLightInput] = useState("#3e3e3e");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const collectionObject = {
      collectionTitle: titleInput,
      colorDark: colorDarkInput,
      colorLight: colorLightInput,
    };

    let response;

    try {
      response = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionObject),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.error || "Unable to save flashcard");
      }

      if (response.ok) {
        const responseBody = await response.json();
        const newCollectionId = responseBody.collection._id;
        mutate("/api/collections");
        handleFilter(newCollectionId);
        onClose();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  function handleTitleInput(event) {
    setTitleInput(event.target.value);
  }

  function handleColorDarkInput(event) {
    setColorDarkInput(event.target.value);
    setColorLightInput(lighten(0.25, event.target.value));
  }

  function handleColorLightInput(event) {
    setColorLightInput(event.target.value);
    setColorDarkInput(darken(0.25, event.target.value));
  }

  return (
    <ModalContainer>
      <ModalForm onSubmit={handleSubmit}>
        <p>Collection Title:</p>
        <input
          value={titleInput}
          onChange={handleTitleInput}
          autoFocus={true}
        />
        <p>Collection Color:</p>
        <ColorContainer>
          <ColorInput
            type="color"
            value={colorDarkInput}
            onChange={handleColorDarkInput}
          />
          <ColorInput
            type="color"
            value={colorLightInput}
            onChange={handleColorLightInput}
          />
        </ColorContainer>
        <div>
          <AddButton disabled={titleInput === ""} type="submit">
            Add
          </AddButton>
          <CancelButton onClick={onClose} type="button">
            Cancel
          </CancelButton>
        </div>
        {error && <p>{error}</p>}
      </ModalForm>
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

const ModalForm = styled.form`
  background-color: white;
  width: 90%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;

  > p {
    margin-top: 0;
    margin-bottom: 4px;
  }

  > input {
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid rgb(118, 118, 118);
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    padding: 8px;
  }
`;

const AddButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 8px 16px;
  margin-right: 16px;
  border-radius: 8px;
  background-color: #5f5fd2;
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

const ColorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: stretch;
  gap: 12px;
  margin-bottom: 16px;
`;

const ColorInput = styled.input`
  width: 50%;
  height: 50px;
  background: none;
  border-radius: 8px;
`;
