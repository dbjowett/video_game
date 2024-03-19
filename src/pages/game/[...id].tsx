import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ScreenshotCarousel } from "~/components/ScreenshotCarousel";
import { SimilarGamesCarousel } from "~/components/SimilarGamesCarousel";
import { VideoCarousel } from "~/components/VideoCarousel";
import Text from "~/components/ui/Text";

import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/utils/api";
import {
  getObjectCategoryName,
  heroImageLoader,
  openInNewTab,
} from "~/utils/gameUtils";

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

  useEffect(() => {
    if (typeof window === "undefined" || !game) return;
    const items = window.localStorage.getItem("game_ids");

    if (!items) {
      window.localStorage.setItem("game_ids", JSON.stringify([game?.id]));
      return;
    }

    const itemArray = JSON.parse(items) as number[];
    const itemIdx = itemArray.findIndex((id) => id === game.id);
    if (itemIdx < 0) {
      itemArray.push(game?.id);
      if (itemArray.length > 8) {
        itemArray.shift();
      }
      window.localStorage.setItem("game_ids", JSON.stringify(itemArray));
    }
  }, [game]);

  if (isLoading || !game) {
    return (
      <div className="m-auto flex h-full max-w-6xl flex-col">
        <Skeleton className="h-full w-full flex-1" />
      </div>
    );
  }

  if (isError) return <div>Error...</div>;
  const imageUrl = heroImageLoader(game.cover.url);

  return (
    <main className="m-auto flex min-h-screen flex-col ">
      {/* HERO */}
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        className="relative h-[40vh] w-full bg-cover bg-top"
      >
        <div className="flex h-full w-full bg-black bg-opacity-50 align-bottom text-white">
          <div className="flex w-full justify-between p-4 md:p-14">
            <div className="flex flex-col justify-end">
              <Text as="h1" size="2xl" className="mb-2">
                {game.name}
              </Text>
              <Text as="h3">Released {game?.release_dates?.[0]?.human}</Text>
            </div>
            <div className="relative flex flex-col justify-end">
              {!!game.rating && (
                <div className="flex flex-col justify-end">
                  <Text size="sm">Score</Text>
                  <Text as="h3" size="lg" className="text-white">
                    {Math.round(game.rating)}%
                  </Text>
                </div>
              )}
              {/* <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-foreground opacity-55">
                <Star color="black" />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Section */}
      <div className="flex flex-col gap-6 p-4 md:p-14">
        <div className=" flex flex-col gap-4 md:flex-row md:gap-12">
          {/* LEFT SIDE */}
          <div className="flex w-[100%] flex-col  gap-4 md:w-[50%] md:gap-6">
            <div className="flex flex-col gap-4 md:gap-6">
              <Text as="h1" size="xl">
                Description
              </Text>
              <Text as="h1" size="sm" className="rounded bg-accent p-4">
                {game.summary}
              </Text>
            </div>
            {!!game.storyline && (
              <div className="flex flex-col gap-4 md:gap-6">
                <Text as="h1" size="xl">
                  Summary
                </Text>
                <Text as="h1" size="sm" className="rounded bg-accent p-4">
                  {game.storyline}
                </Text>
              </div>
            )}
            {!!game.websites && (
              <div className="flex flex-col gap-4 md:gap-6">
                <Text as="h1" size="xl">
                  Websites
                </Text>
                <div className="flex flex-wrap gap-4 rounded bg-accent p-4">
                  <>
                    {game.websites.map((site) => (
                      <a
                        key={site.id}
                        onClick={() => openInNewTab(site.url)}
                        className="cursor-pointer hover:underline "
                      >
                        {getObjectCategoryName(site.category)}
                      </a>
                    ))}
                  </>
                </div>
              </div>
            )}
            {!!game.platforms && (
              <div className="flex flex-col gap-4 md:gap-6">
                <Text as="h1" size="xl">
                  Platforms
                </Text>
                <div className="flex flex-wrap gap-4 rounded bg-accent p-4">
                  {game.platforms.map((plat) => (
                    <Text key={plat.id} as="span">
                      {plat.abbreviation}
                    </Text>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* RIGHT SIDE */}
          <div className="flex w-[100%] flex-col gap-4 md:w-[50%] md:gap-6 ">
            {game?.screenshots && game.screenshots.length > 0 && (
              <div className="flex flex-col gap-6">
                <Text as="h1" size="xl">
                  Screenshots
                </Text>
                <div>
                  <ScreenshotCarousel screenshots={game.screenshots} />
                </div>
              </div>
            )}

            {game?.videos && game.videos.length > 0 && (
              <div className="flex flex-col  gap-4 md:gap-6">
                <Text as="h1" size="xl">
                  Videos
                </Text>

                <VideoCarousel videos={game.videos} />
              </div>
            )}
          </div>
        </div>
        {game?.similar_games && game?.similar_games.length > 0 && (
          <div className="flex flex-col gap-4 md:gap-6">
            <Text as="h1" size="xl">
              Similar Games
            </Text>

            <SimilarGamesCarousel game={game} />
          </div>
        )}
      </div>
    </main>
  );
}
