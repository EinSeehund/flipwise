import styled from "styled-components";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <StyledHeader>
      <StyledTitle>Flipwise</StyledTitle>
      <Navigation />
    </StyledHeader>
  );
}

const StyledTitle = styled.h1`
  margin: 0;
  color: white;
  font-size: 1.5rem;
`;
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #5f5fd2;
`;
