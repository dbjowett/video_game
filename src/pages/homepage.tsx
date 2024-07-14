import { capitalize, debounce } from "~/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { TbX } from "react-icons/tb";
import { GameGrid } from "~/components/GameList";
import { Carousel } from "~/components/ui/Carousel";
import Text from "~/components/ui/Text";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";

const HomePage = () => {
  const [debouncedInput, setDebouncedInput] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const { data: session } = useSession();
  const { data: homepageGames, isFetching: isFetchingHomepage } =
    api.igdb.getHomepageGames.useQuery();

  const { data: faveGames, refetch: refetchFavourites } =
    api.games.getFavourites.useQuery(undefined, {
      enabled: !!session?.user,
    });

  const { data: searchedGames, isFetching } = api.igdb.searchGame.useQuery(
    {
      searchQuery: debouncedInput,
    },
    {
      enabled: Boolean(debouncedInput),
    }
  );

  const debouncedSetInput = debounce((value: string) => {
    setDebouncedInput(value);
  }, 300);

  useEffect(() => {
    debouncedSetInput(input);
  }, [input, debouncedSetInput]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <form
        id="search"
        name="search"
        className="mt-10 flex w-full items-center justify-center space-x-2 px-4"
      >
        <Input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full max-w-80 px-3 py-5"
          placeholder="Search games..."
        />
        <Button className="px-3" type="submit">
          Search
        </Button>
      </form>
      {isFetching && <Text className="mt-4">Loading..</Text>}
      {searchedGames && searchedGames.length > 0 ? (
        <div className="m-10 align-middle">
          <div className="mx-8 flex justify-between align-middle">
            <Text as="h1" size="lg">{`Search result for: ${capitalize(
              input
            )}`}</Text>
            <Badge
              onClick={() => setInput("")}
              className="h-7 cursor-pointer gap-2 align-middle "
            >
              Clear <TbX size={16} />
            </Badge>
          </div>
          <GameGrid
            faveGames={faveGames}
            refetchFavourites={() => void refetchFavourites()}
            games={searchedGames}
          />
        </div>
      ) : (
        <div className="mt-12 flex flex-col gap-12">
          <Carousel
            isLoading={isFetchingHomepage}
            games={homepageGames?.upcoming}
            faveGames={faveGames}
            refetchFavourites={() => void refetchFavourites()}
            type="upcoming"
          />
          <Carousel
            isLoading={isFetchingHomepage}
            games={homepageGames?.popular}
            faveGames={faveGames}
            refetchFavourites={() => void refetchFavourites()}
            type="popular"
          />
          <Carousel
            isLoading={isFetchingHomepage}
            games={homepageGames?.newReleases}
            faveGames={faveGames}
            refetchFavourites={() => void refetchFavourites()}
            type="newReleases"
          />
        </div>
      )}
    </main>
  );
};

export default HomePage;
