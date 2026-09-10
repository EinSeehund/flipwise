import styled from "styled-components";

export default function CollectionTag({
  collectionTitle,
  colorDark,
  colorLight,
  active,
  onToggleTag,
}) {
  return (
    <StyledTag
      $active={active}
      $colorDark={colorDark}
      $colorLight={colorLight}
      onClick={() => {
        onToggleTag(collectionTitle);
      }}
    >
      <p>{collectionTitle}</p>
    </StyledTag>
  );
}

const StyledTag = styled.article`
  padding: 8px 16px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  background-color: ${({ $active, $colorDark, $colorLight }) =>
    $active ? $colorDark : $colorLight};
  opacity: ${({ $active }) => ($active ? 1.0 : 0.5)};

  > p {
    margin: 0;
  }
`;
