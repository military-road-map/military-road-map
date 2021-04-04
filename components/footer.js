import styled from "styled-components";
import Spacer from "./ui/spacer";

const FooterStyles = styled.footer`
  /* background-color: var(--color-green-dark); */
  padding: 32px;
  margin-top: auto;
`;

export default function Footer() {
  return (
    <FooterStyles>
      <Spacer size={32}></Spacer>
    </FooterStyles>
  );
}
