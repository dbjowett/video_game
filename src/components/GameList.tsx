import {
  type QueryObserverResult,
  type RefetchOptions,
  type RefetchQueryFilters,
} from "@tanstack/react-query";
import { useFetchGames } from "~/hooks/useFetchGames";
import { type Game } from "~/pages/api/utils/types";
import { GameItem } from "./GameItem";
import { TabItems, type PageTypes } from "./Navbar";
import { Spinner } from "./ui/Spinner";
import Text from "./ui/Text";

export const GameGrid = ({
  games,
  refetch,
}: {
  games: Game[];
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Game[], unknown>>;
}) => {
  return (
    <div className="px-8 py-4">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {games.map((game) => (
          <GameItem key={game.id} game={game} refetch={() => refetch()} />
        ))}
      </div>
    </div>
  );
};

const GameGridHeader = ({ title }: { title: PageTypes }) => {
  return (
    <div className="flex justify-between px-8 pt-4">
      <Text as="h1" size="lg">
        {TabItems[title].title}
      </Text>
    </div>
  );
};

function GameList({ type }: { type: PageTypes }) {
  const { data: games, isLoading, isError, refetch } = useFetchGames(type);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      {type ? <GameGridHeader title={type} /> : null}
      <GameGrid games={games} refetch={refetch} />
    </div>
  );
}

export default GameList;
