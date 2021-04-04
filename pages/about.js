import styled from "styled-components";
import Layout from "../components/layout";
import Spacer from "../components/ui/spacer";

const AboutStyle = styled.div`
  a {
    text-decoration: none;
    color: var(--color-green-darker);
  }

  li a {
    font-size: var(--size-5);
  }
`;

export default function About() {
  return (
    <Layout>
      <AboutStyle>
        <h2>About Us</h2>
        <p>
          This project was created as part of a 3-day long, remote Hackathon
          hosted by FallIn.
        </p>
        <Spacer size={16}></Spacer>
        <p>
          The event hosted in April 2021 brought together veterans and others in
          tech from across the world to learn, explore, and work on solving the
          problems faced by service members and veterans. Checkout{" "}
          <a href="https://www.fallin.today/">FallIn</a> or{" "}
          <a href="https://operationcode.org/">Operation Code</a> for more great
          opportunities for veterans looking to join tech.
        </p>
        <Spacer size={32}></Spacer>
        <section>
          <h3 style={{ marginBottom: "-8px" }}>Our Team</h3>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/macolby14/">Mark Colby</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/justin-umberger/">
                Justin Umberger
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/torres-adrian/">Adrian T.</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/michael-beliciu/">
                Michael Beliciu
              </a>
            </li>
          </ul>
        </section>
      </AboutStyle>
    </Layout>
  );
}
