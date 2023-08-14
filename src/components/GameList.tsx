import Link from "next/link";
import { TbArrowNarrowRight } from "react-icons/tb";
import useFetchGames, { type PageTypes } from "~/hooks/useFetchGames";

import { GameItem } from "./GameItem";
import { TabItems } from "./Navbar";
import { Spinner } from "./Spinner";

function GameList({ type, small }: { type: PageTypes; small?: boolean }) {
  const { games, isLoading } = useFetchGames(type, small);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="px-8 py-4">
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
        {isLoading && !games ? (
          <Spinner />
        ) : (
          games.map((game) => <GameItem key={game.id} {...game} />)
        )}
      </div>
    </div>
  );
}

export default GameList;
