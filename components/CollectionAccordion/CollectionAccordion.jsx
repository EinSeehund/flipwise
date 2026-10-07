import styled from "styled-components";
import getCardColors from "@/utils/getCardColors";

export default function CollectionAccordion({
  collection,
  cardCount,
  isOpen,
  onToggle,
  children,
}) {
  const colors = getCardColors(collection.colorDark);
  const panelId = `accordion-panel-${collection._id}`;

  return (
    <StyledAccordion>
      <StyledAccordionHeader
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        $colors={colors}
      >
        <StyledTitle>{collection.collectionTitle}</StyledTitle>
        <StyledCount>
          {cardCount} {cardCount === 1 ? "card" : "cards"}
        </StyledCount>
        <StyledChevron aria-hidden="true" $isOpen={isOpen}>
          ▾
        </StyledChevron>
      </StyledAccordionHeader>
      {isOpen && <StyledPanel id={panelId}>{children}</StyledPanel>}
    </StyledAccordion>
  );
}

const StyledAccordion = styled.section`
  width: 100%;
  border-radius: 16px;
  background-color: #f6f6f8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;
const StyledAccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border: none;
  border-radius: 16px;
  font-family: inherit;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  color: ${({ $colors }) => $colors.textColor};
  background: ${({ $colors }) =>
    `linear-gradient(135deg, ${$colors.background}, ${$colors.gradientEnd})`};
`;
const StyledTitle = styled.span`
  flex: 1;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const StyledCount = styled.span`
  padding: 2px 10px;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
`;
const StyledChevron = styled.span`
  font-size: 1.2rem;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "none")};
`;
const StyledPanel = styled.div`
  padding: 16px 0;
`;
