import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";
import { Box } from "./box";

const LayoutStyles = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export default function Layout({ children }) {
  return (
    <LayoutStyles>
      <Header />
      <Box size={800} gutter={16}>
        <main>{children}</main>
      </Box>
      {/* <Footer /> */}
    </LayoutStyles>
  );
}
