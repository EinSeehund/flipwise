import styled from "styled-components";

export default function InformationModal({ text, onClose }) {
  return (
    <ModalContainer>
      <ModalWrapper>
        <p>{text}</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalWrapper>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.section`
  background-color: white;
  width: 90%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;

  > p {
    margin-top: 0;
    margin-bottom: 4px;
  }
`;

const CloseButton = styled.button`
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
