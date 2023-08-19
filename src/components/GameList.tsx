import { useFetchGames } from "~/hooks/useFetchGames";
import { GameItem } from "./GameItem";
import { TabItems, type PageTypes } from "./Navbar";
import { Spinner } from "./ui/Spinner";
import Text from "./ui/Text";
import { SkeletonGroup } from "./ui/skeletonGroup";

function GameList({ type }: { type: PageTypes }) {
  const { data, isLoading, isError } = useFetchGames(type);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Something went wrong!</div>;
  }
  console.log(data);

  return (
    <div className="px-8 py-4">
      {isLoading && !data ? (
        <SkeletonGroup numberOfCards={9} title={TabItems[type].title} />
      ) : (
        <>
          <div className=" mb-3 flex justify-between">
            <Text as="h1" className="mb-4" size="lg">
              {TabItems[type].title}
            </Text>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {data.map((game) => (
              <GameItem key={game.id} {...game} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default GameList;
