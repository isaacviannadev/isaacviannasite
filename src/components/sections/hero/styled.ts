import styled from "styled-components";

export const HeroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const NameText = styled.h1`
  width: fit-content;
  font-size: 8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  margin: 0;
  color: transparent;
  background: white;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  pointer-events: none;

  span {
    display: block;
    width: fit-content;
    width: 100%;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

export const NextSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
