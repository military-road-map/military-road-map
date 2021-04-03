import Head from "next/head";
import React from "react";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    // <div className={styles.container}>
    <React.StrictMode>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Hello</div>
    </React.StrictMode>
    // </div>
  );
}
