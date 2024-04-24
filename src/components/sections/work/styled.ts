import styled from "styled-components";
import { Content } from "../main/styled";

export const WorkItemsSC = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 2rem;
  min-height: 30rem;

  svg {
    color: #aeaeae;
  }

  h3 {
    text-align: left;
  }

  p {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const WorkContent = styled(Content)`
  max-width: 120rem;
  gap: 5rem;

  p {
    max-width: 58rem;
    text-align: center;
  }
`;
