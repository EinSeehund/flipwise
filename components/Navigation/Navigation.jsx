import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function RepeatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 12a9 9 0 0 1-15.5 6.2" />
      <path d="M3 12A9 9 0 0 1 18.5 5.8" />
      <path d="M19 2v4h-4" />
      <path d="M5 22v-4h4" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function FlashcardsIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="7" width="15" height="14" rx="2" />
      <path d="M7 3h13a2 2 0 0 1 2 2v11" />
    </svg>
  );
}

const links = [
  { href: "/repeat", label: "Repeat", Icon: RepeatIcon },
  { href: "/quiz", label: "Quiz", Icon: QuizIcon },
  { href: "/", label: "My Flashcards", Icon: FlashcardsIcon },
];

export default function Navigation() {
  const router = useRouter();

  return (
    <StyledNavigation>
      <StyledList>
        {links.map(({ href, label, Icon }) => {
          const isActive = router.pathname === href;
          return (
            <li key={href}>
              <StyledLink
                href={href}
                $active={isActive}
                aria-current={isActive ? "page" : undefined}
              >
                <StyledIcon>
                  <Icon />
                </StyledIcon>
                <StyledLabel>{label}</StyledLabel>
              </StyledLink>
            </li>
          );
        })}
      </StyledList>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 100vw;
  padding: 8px 16px calc(8px + env(safe-area-inset-bottom));
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 1px solid #e5e5ee;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);

  @media (min-width: 768px) {
    position: static;
    width: auto;
    padding: 0;
    background: none;
    border: none;
    box-shadow: none;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  gap: 8px;
  margin: 0;
  padding: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 64px;
  height: 44px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  color: ${({ $active }) => ($active ? "white" : "#5c5c70")};
  background-color: ${({ $active }) => ($active ? "#5f5fd2" : "transparent")};

  &:hover {
    background-color: ${({ $active }) => ($active ? "#5f5fd2" : "#ececf8")};
  }

  &:focus-visible {
    outline: 2px solid #5f5fd2;
    outline-offset: 2px;
  }

  @media (min-width: 768px) {
    width: auto;
    height: 40px;
    padding: 0 16px;
    color: ${({ $active }) => ($active ? "#5f5fd2" : "white")};
    background-color: ${({ $active }) => ($active ? "white" : "transparent")};

    &:hover {
      background-color: ${({ $active }) =>
        $active ? "white" : "rgba(255, 255, 255, 0.15)"};
    }

    &:focus-visible {
      outline-color: white;
    }
  }
`;

const StyledIcon = styled.span`
  display: flex;

  @media (min-width: 768px) {
    display: none;
  }
`;

// Visually hidden on mobile so the icon-only links keep an accessible name.
const StyledLabel = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;

  @media (min-width: 768px) {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    clip: auto;
  }
`;
