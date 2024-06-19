import Head from "next/head";
import { HomePage } from "./homepage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Video Games - Popular</title>
        <meta
          name="description"
          content="Find your next favourite video game."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}
