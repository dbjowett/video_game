import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/gameUtils";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: sessionData } = useSession();

  const { data: favourites, isLoading } = api.games.getFavourites.useQuery(
    undefined,
    {
      enabled: !!sessionData,
    }
  );

  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <div className="mt-24 flex h-full flex-col">
      {favourites?.length === 0 || !favourites ? (
        <div className="mx-auto text-2xl">
          You have not favourited any games!
        </div>
      ) : (
        <div className="mx-auto flex w-[50%] flex-col gap-4">
          {favourites.map((game) => (
            <Link
              href={`/game/${game.id}/`}
              className="max-w-100 flex gap-3 "
              key={game.id}
            >
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
