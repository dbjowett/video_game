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
      <main className="flex min-h-screen flex-col items-center  ">
        <GameList small type="popular" />
        <GameList small type="toprated" />
        <GameList small type="upcoming" />
      </main>
    </>
  );
}
