import styled from "styled-components";

const BoxStyles = styled.div`
  max-width: ${(props) => props.size}px;
  margin: 0 auto;
  padding: 0 ${(props) => props.gutter}px;
`;

export function Box({ size, children, gutter }) {
  console.log(`box size ${size}`);
  return (
    <BoxStyles size={size} gutter={gutter}>
      {children}
    </BoxStyles>
  );
}
