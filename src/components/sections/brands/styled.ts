import styled, { css, keyframes } from "styled-components";

export const scroll = keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-20rem * 18));
    }
  `;

export const BrandsSC = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 8rem 0;
  margin: 0 auto;
  width: 100%;
  height: fit-content;
  overflow: hidden;

  background: #1e1e1e;
  border: 1px solid #505050;
  border-image: radial-gradient(
    circle,
    #505050 0%,
    rgba(255, 255, 255, 0.071) 100%
  );
  border-image-slice: 1;
`;

export const Slider = styled.div<{ stopped: boolean }>`
  display: flex;
  gap: 20rem;

  width: 100%;
  animation: ${scroll} 20s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  ${({ stopped }) =>
    stopped &&
    css`
      animation-play-state: paused;
    `}
`;

export const BrandDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20rem;
  height: 10rem;
  position: relative;

  & button {
    display: none;
  }

  &:hover {
    & button {
      display: flex;
    }

    & img {
      transform: scale(1.2);
      transition: transform 0.15s ease-in-out;
    }
  }
`;

export const BrandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;

  top: 100%;
  padding: 0.5rem 1rem;
  height: 3rem;
  gap: 0.5rem;

  background: #1e1e1e;
  border: 1px solid #505050;
  border-radius: 0.6rem;

  font-size: 1rem;

  &:hover {
    background: #303030;
  }
`;

export const Image = styled.img`
  height: auto;
  max-height: 10rem;
  max-width: 20rem;
  cursor: pointer;
`;
