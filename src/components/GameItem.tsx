import Image from "next/image";
import { GenreMap } from "~/pages/api/utils/constants";
import { type Game } from "~/pages/api/utils/types";
import { imageLoader } from "~/utils/game";

export const GameItem = (game: Game) => {
  return (
    <div className="max-w-sm cursor-pointer overflow-hidden rounded bg-white shadow-lg hover:bg-gray-50">
      <div className="p-3 pb-0">
        <Image
          priority={false}
          quality={70}
          width={100}
          height={100}
          className="mb-0 h-fit w-fit rounded-lg"
          src={game.cover.url.toString()}
          loader={imageLoader}
          alt={game.name.toString()}
        />
      </div>

      <div className="px-4 py-2">
        <div className="">
          <div className="mb-2 line-clamp-2 text-xl font-bold ">
            {game.name}
          </div>
          <p className="line-clamp-6 text-sm text-gray-700">{game.summary}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1 pb-2 pt-4">
          {game.genres.map((genre) => (
            <span
              key={genre.id}
              className=" inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700"
            >
              {GenreMap[genre.id as keyof typeof GenreMap].hashtag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
