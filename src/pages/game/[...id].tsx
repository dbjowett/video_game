import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  TbAffiliate,
  TbCalendar,
  TbDeviceGamepad2,
  TbUserStar,
} from "react-icons/tb";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import { Spinner } from "~/components/ui/Spinner";
import Text from "~/components/ui/Text";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/game";

const carousel_breakpoints = {
  420: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  580: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
  680: {
    slidesPerView: 5,
    spaceBetween: 50,
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 60,
  },
};

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
  const similarGameIds = game?.similar_games ?? [0];
  const { data: similarGames } = api.igdb.getSimilarGames.useQuery(
    {
      ids: similarGameIds,
    },
    {
      enabled: !!game,
    }
  );

  if (isLoading || !game) return <Spinner />;
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
      <div className="mt-7 flex w-full justify-between gap-4 py-4">
        {/* ******** RATING  ********* */}
        {!!game.rating && (
          <div className="flex w-full gap-2 rounded-xl border border-border p-3 shadow">
            <TbUserStar size={26} />

            <div>
              <div className="underline">Rating</div>
              <Text size="sm">{!!game.rating && Math.round(game.rating)}%</Text>
              <div className="stat-desc">
                Out of {game.rating_count} reviewers
              </div>
            </div>
          </div>
        )}

        {/* ******** RELEASE DATE  ********* */}
        <div className="flex w-full gap-2 rounded-xl border border-border p-3 shadow">
          <TbCalendar size={26} />
          <div>
            <div className="underline">Release Date</div>
            <Text size="sm">{game.release_dates?.[0]?.human}</Text>
          </div>
        </div>

        {/* ******** RELEASE CONSOLES  ********* */}
        <div className="flex w-full gap-2 rounded-xl border border-border p-3 shadow">
          <TbDeviceGamepad2 size={26} />

          <div>
            <div className="underline">Released on</div>
            <Text>{game.platforms?.[0]?.abbreviation}</Text>
            <div className="ml-auto mt-3 flex max-w-[70%] flex-wrap justify-end gap-1 p-2">
              {game.platforms && game.platforms.length > 1 && (
                <Text className="block underline">Also On:</Text>
              )}
              {game.platforms &&
                game.platforms.length > 1 &&
                game.platforms.slice(1).map((pl) => (
                  <Text size="sm" key={pl.id}>
                    {pl.abbreviation}
                  </Text>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/*  ****** SIMILAR GAMES ********* */}
      <div className="mt-10 flex flex-col gap-5 rounded-xl bg-accent p-6 shadow">
        <div className="flex gap-2 align-middle">
          <Text size="xl">Similar Games</Text>
          <TbAffiliate className="self-center" size={26} />
        </div>
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          breakpoints={carousel_breakpoints}
          modules={[Navigation]}
          className="relative h-full px-4"
        >
          {similarGames?.length &&
            similarGames?.map((game) => (
              <SwiperSlide key={game.id} className="m-0 mr-5 h-auto">
                <Link
                  className="flex h-full flex-col justify-center rounded-xl bg-slate-100 p-2 align-middle text-gray-500 shadow hover:bg-slate-200"
                  href={`/game/${game.id}/`}
                >
                  <Image
                    loader={imageLoader}
                    className="mb-0 w-fit self-center rounded-lg"
                    src={game.cover.url}
                    quality={60}
                    alt={game.name}
                    width={10}
                    height={10}
                  />
                  <Text className="line-clamp-1 text-xs">{game.name}</Text>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </main>
  );
}
