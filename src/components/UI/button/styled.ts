import styled from "styled-components";

export const ButtonSC = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 2.4rem;
  gap: 1.6rem;

  width: fit-content;

  background: #1e1e1e;

  border-image: radial-gradient(
    circle,
    #6f6e6e 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-image-slice: 0.5;

  color: #6f6e6e;

  &:hover {
    box-shadow: 0 3px 16px 4px #2a2a2a;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
