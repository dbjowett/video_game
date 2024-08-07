import { Star } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent } from "react";
import { useToast } from "~/components/ui/use-toast";
import { GenreMap, type GmKey } from "~/pages/api/utils/constants";
import { type Game } from "~/server/api/schemas/games";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/gameUtils";
import Text from "./ui/Text";
import { Badge } from "./ui/badge";

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

  const getHumanDate = (time?: number): string | null => {
    if (!time) return null;
    const newDate = new Date();
    newDate.setTime(time * 1000);
    return newDate.toUTCString();
  };

  const releaseDate = getHumanDate(game.first_release_date);

  return (
    <Link
      className="flex h-full max-w-sm flex-1 cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground  shadow  hover:bg-accent sm:mx-[4px] "
      href={`/game/${game.id}/`}
    >
      <div className="pb-2">
        <Image
          priority={false}
          quality={90}
          width={200}
          height={200}
          style={{
            width: "100%",
            height: "auto",
          }}
          className="mb-0 h-fit w-fit"
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
                {game.total_rating ? (
                  <>
                    <Star size={14} weight="fill" color="gold" />
                    {Math.round(game.total_rating)}
                  </>
                ) : (
                  <p className="badge line-clamp-6 text-xs">{releaseDate}</p>
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
