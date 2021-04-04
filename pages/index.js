import styled from "styled-components";
import Layout from "../components/layout";

const IndexStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  h2 {
    font-size: var(--size-3);
    text-align: center;
    padding-bottom: 16px;
  }

  p {
    font-size: var(--size-4);
    padding-bottom: 8px;
  }
`;

export default function index() {
  return (
    <Layout>
      <IndexStyles>
        <h1>Operation On Track</h1>
        <h2>Your military one-stop resource to never miss a milestone again</h2>
        <p>
          There are hundres of items to track while you’re in the miltiary. VA
          appointments, transition appointments, PCS timelines... on top of your
          regular job.
        </p>
        <p>
          Don’t be the service member who misses out on benefits or a program
          until its too late.
        </p>
        <button>Get Started</button>
      </IndexStyles>
    </Layout>
  );
}
