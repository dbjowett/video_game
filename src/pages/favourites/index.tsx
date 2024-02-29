import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/game";

import Image from "next/image";

export default function Home() {
  const { data: sessionData } = useSession();

  const { data: favourites } = api.games.getFavourites.useQuery(undefined, {
    enabled: !!sessionData,
  });

  if (favourites?.length === 0 || !favourites) {
    return <div>You have not favourited any games!</div>;
  }

  return (
    <div>
      <div className="flex flex-col justify-center gap-6 pt-20  align-middle">
        {favourites.map((game) => (
          <div className="max-w-100 flex gap-3" key={game.id}>
            <Image
              priority={false}
              quality={40}
              width={20}
              height={10}
              loader={imageLoader}
              className="mb-0 h-fit w-fit rounded-lg"
              src={game.imageUrl.toString()}
              alt={game.title.toString()}
            />
            <div className="flex items-center text-3xl">{game.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
