import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";

const LayoutStyles = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export default function Layout({ children }) {
  return (
    <LayoutStyles>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyles>
  );
}
