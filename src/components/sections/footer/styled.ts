import styled from "styled-components";

export const FooterSC = styled.footer`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  height: 7.2rem;
  width: 100%;
  max-width: 120rem;
  padding: 1rem 2rem;
`;

export const TextFooter = styled.span`
  font-size: 1.2rem;
  font-weight: 300;
`;

export const SocialFooter = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
