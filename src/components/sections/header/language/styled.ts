import styled from "styled-components";

export const MenuLang = styled.nav`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  position: relative;
`;

export const PopoverLang = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  position: absolute;
  top: 5rem;
  right: 0;

  width: fit-content;
  height: 10rem;
  padding: 1rem;

  background-color: #1d1d1d;
  border: 1px solid #aeaeae;
  border-radius: 0.4rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
`;

export const LangButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 4.2rem;
  width: 100%;

  background-color: transparent;
  border: none;

  img {
    border-radius: 50%;
    height: 2.8rem;
    width: 2.8rem;
  }
`;
