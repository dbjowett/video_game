import Image from "next/image";
import Link from "next/link";
import { TbArrowNarrowRight } from "react-icons/tb";
import useFetchGames, { type PageTypes } from "~/hooks/useFetchGames";
import { GenreMap } from "~/pages/api/utils/constants";
import { type Game } from "~/pages/api/utils/types";
import { imageLoader } from "~/utils/game";
import { TabItems } from "./Navbar";
import { Spinner } from "./Spinner";

function GameList({ type, small }: { type: PageTypes; small?: boolean }) {
  const { games, isLoading } = useFetchGames(type, small);

  if (isLoading) {
    return <Spinner />;
  }

  const GameItem = (game: Game) => {
    return (
      <div className="max-w-sm cursor-pointer overflow-hidden rounded bg-white shadow-lg">
        <div className="p-3 pb-0">
          <Image
            priority={false}
            quality={70}
            width={100}
            height={100}
            className="mb-0 h-fit w-fit rounded-lg"
            src={game.cover.url.toString()}
            loader={imageLoader}
            alt={game.name.toString()}
          />
        </div>

        <div className="px-3 py-2">
          <div className="">
            <div className="mb-2 line-clamp-2 text-xl font-bold ">
              {game.name}
            </div>
            <p className="line-clamp-6 text-sm text-gray-700">{game.summary}</p>
          </div>
          <div className="flex flex-wrap justify-end gap-1 pb-2 pt-4">
            {game.genres.map((genre) => (
              <span
                key={genre.id}
                className=" inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700"
              >
                {GenreMap[genre.id as keyof typeof GenreMap].hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" px-8 py-4 ">
      <div className=" mb-3 flex justify-between">
        <h1 className="text-start align-baseline text-xl font-bold">
          {TabItems[type].title}
        </h1>
        {small ? (
          <Link className="self-end" href={TabItems[type].param}>
            <span className="hover:border-b-1 flex items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-300 hover:text-gray-600">
              See More <TbArrowNarrowRight />
            </span>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {games.map((game) => (
          <GameItem key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}

export default GameList;
