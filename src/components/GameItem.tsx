import Image from "next/image";
import { TbStarFilled } from "react-icons/tb";
import { GenreMap, type GmKey } from "~/pages/api/utils/constants";
import { type Game } from "~/pages/api/utils/types";
import { imageLoader } from "~/utils/game";

export const GameItem = (game: Game) => {
  return (
    <div className="flex max-w-sm flex-1 cursor-pointer flex-col overflow-hidden rounded bg-base-100 shadow-lg">
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
        <div className="">
          <div className="mb-2 line-clamp-1 font-bold">{game.name}</div>
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
          {game.genres.slice(0, 2).map((genre) => (
            <span key={genre.id} className="badge badge-ghost text-xs">
              {GenreMap[genre.id as GmKey].hashtag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
