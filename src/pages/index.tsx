import Head from "next/head";
import GameList from "~/components/GameList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Video Games - Popular</title>
        <meta
          name="description"
          content="Find your next favourite video game."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <GameList type="popular" />
      </main>
    </>
  );
}
