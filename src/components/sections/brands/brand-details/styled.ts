import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 3rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  min-height: 30rem;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;

  & p {
    letter-spacing: 0.08rem;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 1rem;
  flex: 1;

  @media (max-width: 768px) {
    padding-bottom: 4rem;
  }
`;

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  z-index: 0;

  & img {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 25rem;
    max-height: 14rem;
    border-radius: 0.6rem;
  }

  & img:nth-of-type(1) {
    z-index: 1;

    top: 0;
    left: 0;
  }

  & img:nth-of-type(2) {
    z-index: 2;
    top: 10rem;
    left: 10rem;
  }

  & img:hover {
    transform: scale(1.1);
    transition: transform 0.15s ease-in-out;
    z-index: 3;
    box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    & img {
      max-width: 35rem;
      max-height: 17rem;
      inset: 0;
    }
    & img:nth-of-type(2) {
      z-index: 2;
      top: 10rem;
    }
  }
`;
