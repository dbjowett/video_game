import { useSession } from "next-auth/react";

import { type FaveGame, type Game } from "~/server/api/schemas/games";
import { api } from "~/utils/api";
import { GameItem } from "./GameItem";
import { TabItems, type PageTypes } from "./Navbar";
import Text from "./ui/Text";

interface GameGridProps {
  games?: Game[] | null;
  faveGames: FaveGame[] | undefined;
  refetchFavourites: () => void;
}

export const GameGrid = ({
  games,
  faveGames,
  refetchFavourites,
}: GameGridProps) => {
  return (
    <div className="px-8 py-4">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {games?.map((game) => (
          <GameItem
            isFavourite={faveGames?.some((g) => g.id === game.id) ?? false}
            refetchFavourites={refetchFavourites}
            key={game.id}
            game={game}
          />
        ))}
      </div>
    </div>
  );
};

const GameGridHeader = ({ title }: { title: PageTypes }) => {
  return (
    <div className="flex justify-between px-8 pt-4">
      <Text as="h1" size="xl">
        {TabItems[title].title}
      </Text>
    </div>
  );
};

function GameList({ type }: { type: PageTypes }) {
  const { data: games, isLoading } = api.igdb.getGames.useQuery({ type });

  const { data: userData } = useSession();

  const { data: faveGames, refetch: refetchFavourites } =
    api.games.getFavourites.useQuery(undefined, {
      enabled: !!userData?.user,
    });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {type ? <GameGridHeader title={type} /> : null}
      <GameGrid
        games={games}
        faveGames={faveGames}
        refetchFavourites={() => void refetchFavourites()}
      />
    </div>
  );
}

export default GameList;
