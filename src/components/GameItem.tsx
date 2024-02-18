import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent, useEffect } from "react";
import { TbHeart, TbStarFilled } from "react-icons/tb";
import { GenreMap, type GmKey } from "~/pages/api/utils/constants";
import { useToast } from "~/components/ui/use-toast";
import { type Game } from "~/pages/api/utils/types";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/game";
import { Spinner } from "./ui/Spinner";
import Text from "./ui/Text";

export const GameItem = ({ game }: { game: Game }) => {
  const { toast } = useToast();
  const { data } = useSession();

  const [isFave, setIsFave] = useState(false);

  const { data: faveGames, refetch: refetchFavourites } =
    api.games.getFavourites.useQuery(undefined, {
      enabled: !!data?.user,
    });

  useEffect(() => {
    if (faveGames) {
      const isFavourite = faveGames?.some((g) => g.id === game.id.toString());
      setIsFave(isFavourite);
    } else {
      setIsFave(false);
    }
  }, [faveGames, game.id]);

  const deleteFavourite = api.games.deleteFavouriteGame.useMutation({
    onSuccess: () => refetchFavourites(),
    onError: () => console.log("Something went wrong!"),
  });

  const favouriteItem = api.games.favouriteGame.useMutation({
    onSuccess: () => refetchFavourites(),
    onError: () => console.log("Something went wrong!"),
  });

  const handleFavouriteClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFave) {
      toast({
        title: "Removed from favourites!",
        description: `${game.name} has been removed from your favourites.`,
      });
      deleteFavourite.mutate({ id: game.id.toString() });
      return;
    }

    toast({
      title: "Added to favourites!",
      description: `${game.name} has been added. Navigate to Favourites tab to view all your favourite games.`,
    });
    favouriteItem.mutate({
      id: game.id.toString(),
      title: game.name,
      imageUrl: game.cover.url,
    });
  };

  if (!game) return <Spinner />;

  return (
    <Link
      className="flex h-auto max-w-sm flex-1 cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow"
      href={`/game/${game.id}/`}
    >
      <div className="p-3 pb-0">
        <Image
          priority={false}
          quality={100}
          width={100}
          height={100}
          className="mb-0 h-fit w-fit rounded-lg"
          src={game.cover.url.toString()}
          loader={imageLoader}
          alt={game.name.toString()}
        />
      </div>

      <div className="flex h-auto flex-1 flex-col justify-between px-4 py-2">
        <div>
          <Text className="mb-2 line-clamp-1 font-bold ">{game.name}</Text>
          {game.rating ? (
            <p className="text-base-400 badge gap-1 text-xs">
              <TbStarFilled color="gold" /> {Math.round(game.rating)}
            </p>
          ) : (
            <p className="badge line-clamp-6 text-xs">
              {game.release_dates[0]?.human}
            </p>
          )}
        </div>
        <div className="flex flex-wrap justify-end gap-1 pb-2 pt-4">
          {game.genres?.slice(0, 2).map((genre) => (
            <span key={genre.id} className="badge badge-ghost text-xs">
              {GenreMap[genre.id as GmKey].hashtag}
            </span>
          ))}
        </div>
        <div
          className="z-10 flex h-6 w-6 items-center justify-center rounded-full hover:bg-slate-100"
          onClick={handleFavouriteClick}
        >
          <TbHeart color={isFave ? "red" : "gray-400"} className={`fill-red`} />
        </div>
      </div>
    </Link>
  );
};
