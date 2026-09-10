import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Navigation() {
  const router = useRouter();

  return (
    <StyledNavigation>
      <StyledList>
        <li>
          <StyledLink
            href="/quiz"
            $active={router.pathname === "/quiz"}
            aria-current={router.pathname === "/quiz" ? "page" : undefined}
          >
            Quiz
          </StyledLink>
        </li>
        <li>
          <StyledLink
            href="/"
            $active={router.pathname === "/"}
            aria-current={router.pathname === "/" ? "page" : undefined}
          >
            My Flashcards
          </StyledLink>
        </li>
      </StyledList>
    </StyledNavigation>
  );
}

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
`;

const StyledNavigation = styled.nav`
  position: fixed;
  background-color: #9a9af8;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 100vw;
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  ${({ $active }) =>
    $active &&
    `
    font-weight: bold;
    border-bottom: 2px dotted white;
  `}
`;
