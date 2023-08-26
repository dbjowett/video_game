import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbCalendar, TbDeviceGamepad2, TbUserStar } from "react-icons/tb";
import { Spinner } from "~/components/ui/Spinner";
import Text from "~/components/ui/Text";
import { useFetchGame } from "~/hooks/useFetchGames";
import { imageLoader } from "~/utils/game";

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    void setQuery(router.query.id as string);
  }, [router.query, router.isReady]);
  console.log(query);

  const { data: game, isLoading, isError } = useFetchGame(query);

  if (isLoading || !game) return <Spinner />;
  if (isError) return <div>Error...</div>;

  return (
    <main className="m-auto mx-10 flex min-h-screen max-w-6xl flex-col">
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:align-super">
        <Image
          priority
          quality={100}
          width={1000}
          height={1000}
          className="mb-0 w-fit self-center rounded-lg"
          src={game.cover.url.toString()}
          loader={imageLoader}
          alt={game.name.toString()}
        />

        <div className="flex h-auto flex-col rounded-lg bg-white">
          <Text as="h1" size="xl" className="px-6  pt-4">
            {game.name}
          </Text>
          <div className="divider m-0"></div>
          <Text as="p" size="sm" className="px-6">
            {game.summary}
          </Text>
        </div>
      </div>
      <div className="stats  stats-vertical mt-7 shadow md:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-primary">
            <TbUserStar size={36} />
          </div>
          <div className="stat-title">Rating</div>
          <Text size="xl" className="stat-value">
            {Math.round(game.rating)}%
          </Text>
          <div className="stat-desc">Out of {game.rating_count} reviewers</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <TbCalendar size={36} />
          </div>
          <div className="stat-title">Release Date</div>
          <Text size="xl" className="stat-value">
            {game.release_dates[0]?.human}
          </Text>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <TbDeviceGamepad2 size={36} />
          </div>
          <div className="stat-title">Released on</div>
          <Text size="xl" className="stat-value">
            {game.platforms[0]?.abbreviation}
          </Text>
          <div className="flex gap-1">
            {game.platforms.length > 1 &&
              game.platforms.slice(1).map((pl) => (
                <div key={pl.id} className="stat-desc text-gray-500">
                  {pl.abbreviation}
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
