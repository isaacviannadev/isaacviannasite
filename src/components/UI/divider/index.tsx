import styled from "styled-components";

const DividerSC = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 1px;
  max-width: 120rem;
  background: rgb(111, 110, 110);
  background: radial-gradient(
    circle,
    #505050 0%,
    rgba(255, 255, 255, 0.071) 100%
  );
`;

const Divider = () => {
  return <DividerSC />;
};

export default Divider;
