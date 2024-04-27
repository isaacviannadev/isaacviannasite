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
  flex: 1.5;

  @media (max-width: 768px) {
    flex: 1.2;
  }
  @media (max-width: 465px) {
    flex: 1;
  }
`;

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 30rem;
  padding: 1rem;
  z-index: 0;

  & img {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 32rem;
    max-height: 16rem;
    border-radius: 0.6rem;
    aspect-ratio: 16 / 9;
  }

  & img:nth-of-type(1) {
    z-index: 1;
    top: 1rem;
    left: 1rem;
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
      max-width: 40rem;
      max-height: 20rem;
    }

    & img:nth-of-type(1) {
      left: 50%;
      transform: translateX(calc(-50% - 4rem));
    }

    & img:nth-of-type(2) {
      top: 10rem;
      left: 50%;
      transform: translateX(calc(-50% + 4rem));
    }
  }

  @media (max-width: 465px) {
    & img {
      max-width: auto;
      max-height: 17rem;
      aspect-ratio: 16 / 9;
    }

    & img:nth-of-type(1) {
      left: 50%;
      transform: translateX(calc(-50%));
    }

    & img:nth-of-type(2) {
      left: 50%;
      transform: translateX(calc(-50%));
    }
  }
`;
