import Head from "next/head";
import { useState } from "react";
import GameList from "~/components/GameList";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Home() {
  const [input, setInput] = useState<string>("");

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
        <div className="flex items-center space-x-2">
          <Input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-80 px-3 py-5"
            placeholder="Search games..."
          />
          <Button className="px-3">Search</Button>
        </div>
        <GameList small type="popular" />
        <GameList small type="toprated" />
        <GameList small type="upcoming" />
      </main>
    </>
  );
}
