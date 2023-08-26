import axios from "axios";
import Head from "next/head";
import { useState, type FormEvent } from "react";
import { GameGrid } from "~/components/GameList";
import { Carousel } from "~/components/ui/Carousel";
import { Spinner } from "~/components/ui/Spinner";
import Text from "~/components/ui/Text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { capitalize } from "~/utils/game";
import { type Game } from "./api/utils/types";

const initialData = { input: "", data: [] };

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchedData, setSearchedData] = useState<{
    input: string;
    data: Game[];
  }>(initialData);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    setSearchedData(initialData);
    e.preventDefault();
    const tInput = input.trim();
    void axios
      .get(`/api/games/search/?input=${tInput} `)
      .then(({ data }) => setSearchedData({ input, data: data as Game[] }));
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
        <form onSubmit={onSubmit} className="mt-10 flex items-center space-x-2">
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
        {input && !searchedData && <Spinner />}
        {searchedData.data.length > 0 ? (
          <div className="m-10">
            <Text
              className="ml-8"
              as="h1"
              size="lg"
            >{`Search result for: ${capitalize(searchedData.input)}`}</Text>
            <GameGrid games={searchedData.data} />
          </div>
        ) : (
          <div className="mt-12 flex flex-col gap-12">
            <Carousel type="popular" />
            <Carousel type="toprated" />
            <Carousel type="upcoming" />
          </div>
        )}
      </main>
    </>
  );
}
