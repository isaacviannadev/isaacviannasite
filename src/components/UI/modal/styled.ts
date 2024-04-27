import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(21, 21, 21, 0.75);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 100%;
  max-width: 80rem;
  background-color: #1e1e1e;
  border-radius: 0.5rem;
  border: 1px solid #333;

  padding: 1.4rem;
  gap: 1rem;

  filter: drop-shadow(0 0 2rem rgba(0, 0, 0, 0.5));
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
