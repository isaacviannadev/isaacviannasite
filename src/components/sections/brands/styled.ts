import styled from "styled-components";

export const BrandsSC = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 8rem 0;
  margin: 0 auto;
  width: 100%;
  height: fit-content;
  margin-bottom: 2.4rem;
  overflow: hidden;
  position: relative;

  background: #1e1e1e;
  border: 1px solid #505050;
  border-image: radial-gradient(
    circle,
    #505050 0%,
    rgba(255, 255, 255, 0.071) 100%
  );
  border-image-slice: 1;
`;

export const Slider = styled.div`
  display: flex;
  gap: 20rem;

  width: 100%;
  animation: scroll 20s linear infinite;

  img {
    height: auto;
    max-height: 10rem;
    max-width: 20rem;
  }

  &:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-20rem * 18));
    }
  }
`;
