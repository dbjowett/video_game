import Image from "next/image";
import useFetchGames, { type PageTypes } from "~/hooks/useFetchGames";
import { type Game } from "~/pages/api/utils/types";
import { imageLoader } from "~/utils/game";
import { Spinner } from "./Spinner";

function GameList({ type }: { type: PageTypes }) {
  const { games, isLoading } = useFetchGames(type);

  if (isLoading) {
    return <Spinner />;
  }

  const GameItem = (game: Game) => {
    return (
      <div className="max-w-sm overflow-hidden rounded p-8 shadow-lg">
        <Image
          width={260}
          height={260}
          quality={60}
          className="w-full rounded-lg"
          src={game.cover.url.toString()}
          loader={imageLoader}
          alt={game.name.toString()}
        />

        <div className="py-4">
          <div className="mb-2 text-xl font-bold">{game.name}</div>
          <p className="text-base text-gray-700">{game.summary}</p>
        </div>
        <div className="pb-2 pt-4">
          {game.genres.map((genre) => (
            <span
              key={genre.id}
              className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700"
            >
              #{genre.name.toLocaleLowerCase()}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="my-8 grid grid-cols-3 gap-8">
      {games.map((game) => (
        <GameItem key={game.id} {...game} />
      ))}
    </div>
  );
}

export default GameList;
