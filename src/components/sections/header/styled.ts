import styled from "styled-components";

export const HeaderSC = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  height: 7.2rem;
  width: 100%;
  max-width: 120rem;
  padding: 1rem 2rem;
`;

export const MailWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.2rem;
  width: 4.2rem;
  border-radius: 50%;
  background-color: #1d1d1d;
  border: 1px solid #aeaeae;
`;

export const Social = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
