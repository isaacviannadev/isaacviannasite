import styled from "styled-components";

export const HeroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 100;
  background: black;
`;

export const NameText = styled.h1`
  width: 100%;
  font-size: 8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  margin: 0;
  color: #666666;
  text-align: center;
  position: relative;
  z-index: 2;
  mix-blend-mode: difference;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

export const NextSection = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  mix-blend-mode: difference;
  display: flex;
  align-items: center;
  justify-content: center;
`;
