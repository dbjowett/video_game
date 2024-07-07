import { useSession } from "next-auth/react";
import { useFetchGames } from "~/hooks/useFetchGames";

import { type Game, type FaveGame } from "~/server/api/schemas/games";
import { api } from "~/utils/api";
import { GameItem } from "./GameItem";
import { TabItems, type PageTypes } from "./Navbar";
import Text from "./ui/Text";

interface GameGridProps {
  faveGames: FaveGame[] | undefined;
  games: Game[] | undefined;
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

function GameList({ games, type }: { games?: Game[]; type: PageTypes }) {
  const { data } = useFetchGames(type);
  const { data: userData } = useSession();
  const { data: faveGames, refetch: refetchFavourites } =
    api.games.getFavourites.useQuery(undefined, {
      enabled: !!userData?.user,
    });

  return (
    <div>
      {type ? <GameGridHeader title={type} /> : null}
      <GameGrid
        faveGames={faveGames}
        refetchFavourites={() => void refetchFavourites()}
        games={games ?? data}
      />
    </div>
  );
}

export default GameList;
