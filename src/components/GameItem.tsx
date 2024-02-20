import { FolderSimpleStar, Star } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent } from "react";
import { useToast } from "~/components/ui/use-toast";
import { GenreMap, type GmKey } from "~/pages/api/utils/constants";
import { type Game } from "~/pages/api/utils/types";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/game";
import { Spinner } from "./ui/Spinner";
import Text from "./ui/Text";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

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
    if (isFavourite) {
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
      className="flex h-full max-w-sm flex-1 cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card  text-card-foreground  shadow hover:bg-accent "
      href={`/game/${game.id}/`}
    >
      <div className="p-3 pb-0">
        <Image
          priority={false}
          quality={60}
          width={200}
          height={200}
          style={{
            width: "100%",
            height: "auto",
          }}
          className="mb-0 h-fit w-fit rounded-lg"
          src={game.cover.url.toString()}
          loader={imageLoader}
          alt={game.name.toString()}
        />
      </div>

      <div className="flex h-auto flex-1 flex-col justify-between px-4 py-2">
        <div>
          <Text className="mb-2 line-clamp-1 font-bold ">{game.name}</Text>

          <Badge
            variant="outline"
            className="text-base-400 badge gap flex w-fit gap-1 px-2 py-1 text-xs"
          >
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
        </div>
        <div className="flex flex-wrap justify-end gap-1 pb-2 pt-4">
          {game.genres?.slice(0, 2).map((genre) => (
            <Badge variant="outline" key={genre.id}>
              {GenreMap[genre.id as GmKey].hashtag}
            </Badge>
          ))}
        </div>

        <Button variant="ghost" size="icon" onClick={handleFavouriteClick}>
          <FolderSimpleStar
            size={20}
            weight={isFavourite ? "fill" : "regular"}
          />
        </Button>
      </div>
    </Link>
  );
};
