import Head from "next/head";
import GameList from "~/components/GameList";

export default function Home() {
  const Search = () => {
    return <input type="text" />;
  };

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
        <Search />
        <GameList small type="popular" />
        <GameList small type="toprated" />
        <GameList small type="upcoming" />
      </main>
    </>
  );
}
