import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import { Box } from "./ui/box";
import styles from "./header.module.css";
import styled from "styled-components";

const HeaderStyles = styled.header`
  background-color: hsla(120, 45%, 55%, 0.95);
  color: white;

  a {
    color: white;

    &:visited {
      color: white;
    }
  }
`;

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();

  return (
    <HeaderStyles>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <Box size={800}>
        <div className={styles.signedInStatus}>
          <p
            className={`nojs-show ${
              !session && loading ? styles.loading : styles.loaded
            }`}
          >
            {!session && (
              <>
                <span className={styles.notSignedInText}>
                  You are not signed in
                </span>
                <a
                  href={`/api/auth/signin`}
                  className={styles.buttonPrimary}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Sign in
                </a>
              </>
            )}
            {session && (
              <>
                {session.user.image && (
                  <span
                    style={{ backgroundImage: `url(${session.user.image})` }}
                    className={styles.avatar}
                  />
                )}
                <span className={styles.signedInText}>
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email || session.user.name}</strong>
                </span>
                <a
                  href={`/api/auth/signout`}
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </p>
        </div>
        <nav>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/tracker">
                <a>Trackers</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </Box>
    </HeaderStyles>
  );
}
