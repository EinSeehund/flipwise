import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <StyledTitle>Flipwise</StyledTitle>
    </StyledHeader>
  );
}

const StyledTitle = styled.h1`
  text-align: left;
  color: white;
  font-size: 1.5rem;
`;
const StyledHeader = styled.header`
  background-color: #5f5fd2;
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  padding: 0 20px;
  z-index: 9;
`;
