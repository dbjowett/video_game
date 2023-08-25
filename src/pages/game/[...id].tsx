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
  console.log(game);

  return (
    <main className="m-auto mx-10 flex min-h-screen max-w-6xl flex-col">
      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:align-super">
        <Image
          priority={false}
          quality={100}
          width={1000}
          height={1000}
          className="mb-0 w-fit self-center rounded-lg"
          src={game.cover.url.toString()}
          loader={imageLoader}
          alt={game.name.toString()}
        />
        <div className="mx-2 h-auto rounded-lg bg-white">
          <Text as="h1" size="xl" className="px-6  pt-4">
            {game.name}
          </Text>
          <div className="divider"></div>
          <Text as="h1" size="sm" className="p-4 px-6">
            {game.summary}
          </Text>
        </div>
      </div>
      <div className="stats mt-7 shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <TbUserStar size={40} />
          </div>
          <div className="stat-title">Rating</div>
          <div className="stat-value text-primary">
            {Math.round(game.rating)}%
          </div>
          <div className="stat-desc">Out of {game.rating_count} reviewers</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <TbCalendar size={40} />
          </div>
          <div className="stat-title">Release Date</div>
          <div className="stat-value text-primary">
            {game.release_dates[0]?.human}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <TbDeviceGamepad2 size={40} />
          </div>
          <div className="stat-title">Released on</div>
          <div className="stat-value">{game.platforms[0]?.abbreviation}</div>
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
