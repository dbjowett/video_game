import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent } from "react";
import { TbHeart, TbStarFilled } from "react-icons/tb";
import { GenreMap, type GmKey } from "~/pages/api/utils/constants";
import { type Game } from "~/pages/api/utils/types";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/game";
import { Spinner } from "./ui/Spinner";
import Text from "./ui/Text";

export const GameItem = ({ game }: { game: Game }) => {
  const { data } = useSession();
  if (!game) return <Spinner />;

  const { data: allFavourites, refetch: refetchFavourites } =
    api.games.getFavourites.useQuery(undefined, {
      enabled: !!data?.user,
    });

  const isGameFavourited = allFavourites?.some(
    (favGame) => favGame.id === game.id.toString()
  );

  const favouriteItem = api.games.favouriteGame.useMutation({
    onSuccess: () => refetchFavourites(),
    onError: () => console.log("Something went wrong!"),
  });

  const handleFavouriteClick = (e: MouseEvent) => {
    if (isGameFavourited) return;
    e.stopPropagation();
    e.preventDefault();
    favouriteItem.mutate({
      id: game.id.toString(),
      title: game.name,
      imageUrl: game.cover.url,
    });
  };

  return (
    <Link
      className="flex h-auto max-w-sm flex-1 cursor-pointer flex-col overflow-hidden rounded-xl bg-base-100 shadow"
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
          <TbHeart color={isGameFavourited ? "red" : ""} />
        </div>
      </div>
    </Link>
  );
};
