import styled from "styled-components";

export default function CollectionFilter({
  collections,
  collectionsIsLoading,
  collectionsFetchError,
  onFilter,
  onToggleModal,
  onNewCollection,
  onEditCollection,
  filterById,
}) {
  if (collectionsIsLoading) {
    return <p>Loading...</p>;
  }

  if (collectionsFetchError) {
    return <p>Failed to fetch ressources...</p>;
  }

  function handleChange(event) {
    onFilter(event.target.value);
  }

  return (
    <CollectionContainer>
      <label htmlFor="filterSelect">Filter Flashcards</label>
      <StyledSelect
        value={filterById}
        id="filterSelect"
        onChange={handleChange}
      >
        <option value={""}>Show all collections</option>
        {collections.map((collection) => (
          <option key={collection._id} value={collection._id}>
            {collection.collectionTitle}
          </option>
        ))}
      </StyledSelect>
      <ButtonContainer>
        <StyledButton onClick={onNewCollection}>New Collection</StyledButton>
        <StyledButton onClick={onEditCollection} disabled={filterById === ""}>
          Edit
        </StyledButton>
      </ButtonContainer>
    </CollectionContainer>
  );
}

const CollectionContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;

  > label {
    margin-bottom: 4px;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const StyledButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 8px 16px;
  margin: 0 2px;
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
