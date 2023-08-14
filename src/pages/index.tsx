import Head from "next/head";
import { useEffect, useState } from "react";
import { type Game } from "./api/utils/types";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/games");
        const data = (await response.json()) as Game[];
        setGames(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().catch((err) => console.log(err));
  }, []);

  console.log(games);

  return (
    <>
      <Head>
        <title>Video Games</title>
        <meta
          name="description"
          content="Find your next favourite video game."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div>
          {games.map((game) => {
            return <div key={game.id}>{game.name}</div>;
          })}
        </div>
      </main>
    </>
  );
}
