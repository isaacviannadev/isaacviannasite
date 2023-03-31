import styled from "styled-components";

export const CardSC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 100%;
  background: #1e1e1e;
  padding: 5rem 2.4rem;
  gap: 2rem;

  border: 1px solid #6f6e6e;
  border-image: radial-gradient(
    circle,
    #6f6e6e 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-image-slice: 0.5;

  color: #6f6e6e;

  svg {
    color: #6f6e6e;
  }
`;

type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <CardSC>{children}</CardSC>;
};

export default Card;
