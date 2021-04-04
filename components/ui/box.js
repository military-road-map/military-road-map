import styled from "styled-components";

const BoxStyles = styled.div`
  max-width: ${(props) => props.size}px;
  padding: 0 ${(props) => props.gutter}px;
  width: 100%;
  margin: auto;
`;

export function Box({ size, children, gutter }) {
  return (
    <BoxStyles size={size} gutter={gutter}>
      {children}
    </BoxStyles>
  );
}
