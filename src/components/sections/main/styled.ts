import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: 80rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 90rem;
  padding: 8rem 2rem;
  gap: 4rem;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 3.2rem;
    }
  }
`;
