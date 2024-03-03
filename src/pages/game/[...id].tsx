import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  TbAffiliate,
  TbCalendar,
  TbDeviceGamepad2,
  TbUserStar,
} from "react-icons/tb";

import { SimilarGamesCarousel } from "~/components/SimilarGamesCarousel";

import Text from "~/components/ui/Text";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/game";

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    void setQuery((router.query.id as string)?.toString());
  }, [router.query, router.isReady]);

  const {
    data: game,
    isLoading,
    isError,
  } = api.igdb.getGameById.useQuery(
    {
      id: query,
    },
    {
      enabled: !!query,
    }
  );

  if (isLoading || !game) {
    return (
      <div className="m-auto flex h-full max-w-6xl flex-col">
        <Skeleton className="h-full w-full flex-1" />
      </div>
    );
  }

  const getReleasedOnString = (): string | undefined => {
    if (!game.platforms) return;
    let gameString = "";
    game.platforms.forEach(
      (platform) =>
        (gameString = gameString.concat(` ${platform.abbreviation} `))
    );
    return gameString;
  };

  if (isError) return <div>Error...</div>;
  return (
    <main className="m-auto flex min-h-screen max-w-6xl flex-col">
      <div className="mt-8 flex flex-col gap-6 md:flex-col md:align-super">
        <Image
          priority
          quality={100}
          width={200}
          height={200}
          className="mb-0 w-fit self-center rounded-lg shadow"
          src={game.cover.url}
          loader={imageLoader}
          alt={game.name}
        />

        <div className="flex h-auto flex-col rounded-lg bg-accent shadow">
          <Text as="h1" size="xl" className="px-6 pt-4">
            {game.name}
          </Text>
          <div className="divider m-0"></div>
          <Text as="p" size="sm" className="px-6 pb-4">
            {game.summary}
          </Text>
        </div>
      </div>

      {/* INFO CONTAINER */}
      <div className="mt-7 flex  w-full justify-between gap-4 py-4">
        {/* ******** RATING  ********* */}
        {!!game.rating && (
          <div className="flex w-full flex-col gap-2 rounded-xl border border-border p-3 shadow">
            <TbUserStar size={26} className="mx-auto" />

            <div>
              <div className="underline">Rating</div>
              <Text size="base">
                {!!game.rating && Math.round(game.rating)}%
              </Text>
              <Text size="sm">Out of {game.rating_count} reviewers</Text>
            </div>
          </div>
        )}

        {/* ******** RELEASE DATE  ********* */}
        <div className="flex w-full flex-col  gap-2 rounded-xl border border-border p-3 shadow">
          <TbCalendar size={26} className="mx-auto" />
          <div>
            <div className="underline">Release Date</div>
            <Text size="sm">{game.release_dates?.[0]?.human}</Text>
          </div>
        </div>

        {/* ******** RELEASE CONSOLES  ********* */}
        <div className="flex w-full flex-col gap-2 rounded-xl border border-border p-3 shadow">
          <TbDeviceGamepad2 size={26} className="mx-auto" />

          <div>
            <div className="underline">Released on</div>
            <Text size="sm">{getReleasedOnString()}</Text>
          </div>
        </div>
      </div>

      {/*  ****** SIMILAR GAMES ********* */}
      <div className="mt-10 flex flex-col gap-5 rounded-xl bg-accent p-6 shadow">
        <div className="flex gap-2 align-middle">
          <Text size="xl">Similar Games</Text>
          <TbAffiliate className="self-center" size={26} />
        </div>

        <SimilarGamesCarousel game={game} />
      </div>
    </main>
  );
}
