import axios from "axios";
import Head from "next/head";
import { useState, type FormEvent } from "react";
import Carousel from "~/components/ui/Carousel";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type Game } from "./api/utils/types";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchedData, setSearchedData] = useState<Game[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tInput = input.trim();
    void axios
      .get(`/api/games/search/?input=${tInput} `)
      .then(({ data }) => setSearchedData(data as Game[]));
    setInput("");
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
      <main className="flex min-h-screen flex-col items-center">
        <form onSubmit={onSubmit} className="flex items-center space-x-2">
          <Input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-80 px-3 py-5"
            placeholder="Search games..."
          />
          <Button className="px-3" type="submit">
            Search
          </Button>
        </form>
        {searchedData.length > 0 ? (
          <>
            {searchedData.map((game) => (
              <div key={game.id}>{game.name}</div>
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-12 p-10 ">
            <Carousel type="popular" />
            <Carousel type="toprated" />
            <Carousel type="upcoming" />
          </div>
        )}
      </main>
    </>
  );
}
