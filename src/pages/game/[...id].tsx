import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  TbAffiliate,
  TbCalendar,
  TbDeviceGamepad2,
  TbUserStar,
} from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Spinner } from "~/components/ui/Spinner";
import Text from "~/components/ui/Text";
import { useFetchGame, useFetchSimilar } from "~/hooks/useFetchGames";
import { imageLoader } from "~/utils/game";

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    void setQuery(router.query.id as string);
  }, [router.query, router.isReady]);

  const { data: game, isLoading, isError } = useFetchGame(query);
  const { data: similarGames } = useFetchSimilar(game?.similar_games ?? [""]);

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
          <Text as="p" size="sm" className="px-6 pb-4">
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
      <div className="mt-10 flex flex-col gap-2 rounded-xl bg-white p-6">
        <div className="flex gap-2">
          <Text size="xl">Similar Games</Text>
          <TbAffiliate size={36} />
        </div>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {similarGames?.length &&
            similarGames?.map((game) => (
              <SwiperSlide key={game.id} className="h-auto">
                <Link className=" text-gray-500" href={`/game/${game.id}/`}>
                  <Image
                    loader={imageLoader}
                    className="mb-0 w-fit self-center rounded-lg"
                    src={game.cover.url}
                    quality={40}
                    alt={game.name}
                    width={10}
                    height={10}
                  />
                  <p>{game.name}</p>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </main>
  );
}
