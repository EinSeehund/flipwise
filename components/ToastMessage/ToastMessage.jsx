import styled from "styled-components";

export default function ToastMessage({ text }) {
  return (
    <StyledToastContainer>
      <p>{text}</p>
    </StyledToastContainer>
  );
}

const StyledToastContainer = styled.div`
  position: fixed;
  top: 30px;
  background-color: #d6d6f7;
  color: #101010;
  font-family: inherit;
  font-size: inherit;
  padding: 8px 16px;
  border-radius: 8px;
  z-index: 10;
`;
