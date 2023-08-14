import Link from "next/link";
import { TbArrowNarrowRight } from "react-icons/tb";
import useFetchGames, { type PageTypes } from "~/hooks/useFetchGames";

import { GameItem } from "./GameItem";
import { TabItems } from "./Navbar";
import { Skeleton } from "./ui/skeleton";

function GameList({ type, small }: { type: PageTypes; small?: boolean }) {
  const { games, isLoading } = useFetchGames(type, small);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="px-8 py-4">
      {isLoading && games.length === 0 ? (
        <>
          <div className=" mb-3 flex justify-between">
            <h1 className="text-start align-baseline text-xl font-bold">
              {TabItems[type].title}
            </h1>
          </div>
          <div className="grid  gap-8 sm:grid-cols-2 md:grid-cols-3">
            {skeleton.map((num) => {
              return (
                <div
                  className="flex h-[300px] w-60 flex-col gap-4 rounded-lg bg-white"
                  key={num}
                >
                  <div className="p-3">
                    <Skeleton className="w-100 h-28 rounded bg-slate-200 px-5" />
                  </div>
                  <div className="ml-3 flex flex-col justify-center gap-2.5 py-2 align-middle ">
                    <Skeleton className="h-3 w-[95%]  bg-slate-200" />
                    <Skeleton className="h-3 w-[95%]  bg-slate-200" />
                    <Skeleton className="h-3 w-[90%] bg-slate-200" />
                    <Skeleton className="h-3 w-[90%] bg-slate-200" />
                    <Skeleton className="h-3 w-[90%] bg-slate-200" />
                    <Skeleton className="h-3 w-[90%] bg-slate-200" />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default GameList;
