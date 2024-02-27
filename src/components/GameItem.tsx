import { Star } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent } from "react";
import { useToast } from "~/components/ui/use-toast";
import { GenreMap, type GmKey } from "~/pages/api/utils/constants";
import { type Game } from "~/pages/api/utils/types";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/game";
import Text from "./ui/Text";
import { Badge } from "./ui/badge";
import { Spinner } from "./ui/spinner";

interface GameItemProps {
  game: Game;
  isFavourite: boolean;
  refetchFavourites: () => void;
}

export const GameItem = ({
  game,
  isFavourite,
  refetchFavourites,
}: GameItemProps) => {
  const { toast } = useToast();
  const { status: sessionStatus } = useSession();

  const hasAuth = sessionStatus === "authenticated";

  const deleteFavourite = api.games.deleteFavouriteGame.useMutation({
    onSuccess: () => refetchFavourites(),
    onError: () => console.log("Something went wrong!"),
  });

  const favouriteItem = api.games.favouriteGame.useMutation({
    onSuccess: () => void refetchFavourites(),
    onError: () => console.log("Something went wrong!"),
  });

  const handleFavouriteClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasAuth) return;
    if (isFavourite) {
      toast({
        title: `${game.name} removed from favourites!`,
      });
      deleteFavourite.mutate({ id: game.id.toString() });
      return;
    }

    toast({
      title: `${game.name} has been added!`,
      description: `Visit favourites tab to view all your favourite games.`,
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
      className="flex h-full max-w-sm flex-1 cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card  text-card-foreground  shadow hover:bg-accent "
      href={`/game/${game.id}/`}
    >
      <div className="p-3 pb-0">
        <Image
          priority={false}
          quality={90}
          width={200}
          height={200}
          style={{
            width: "100%",
            height: "auto",
          }}
          className="mb-0 h-fit w-fit rounded-lg"
          src={game.cover.url.toString()}
          loader={(props) => imageLoader({ ...props, maxSize: false })}
          alt={game.name.toString()}
        />
      </div>

      <div className="flex h-auto flex-1 flex-col justify-between gap-3 px-3 py-2">
        {/* Title */}
        <div>
          <Text className="mb-2 line-clamp-1 font-bold ">{game.name}</Text>

          {/* ** Badges **  */}
          <div className="flex flex-wrap justify-between gap-2">
            <Badge variant="outline">
              <>
                {game.rating ? (
                  <>
                    <Star size={14} weight="fill" color="gold" />
                    {Math.round(game.rating)}
                  </>
                ) : (
                  <p className="badge line-clamp-6 text-xs">
                    {game.release_dates[0]?.human}
                  </p>
                )}
              </>
            </Badge>
            <div className="flex gap-1">
              {game.genres?.slice(0, 2).map((genre) => (
                <Badge variant="secondary" key={genre.id}>
                  {GenreMap[genre.id as GmKey].hashtag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end">
          {hasAuth && (
            <Badge
              variant={isFavourite ? "default" : "outline"}
              className="flex h-[28px] w-[28px] justify-center rounded-full p-1"
              onClick={handleFavouriteClick}
            >
              <Star size={14} weight={isFavourite ? "fill" : "regular"} />
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};
