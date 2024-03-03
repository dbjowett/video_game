import Image from "next/image";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Text from "~/components/ui/Text";
import { type Game } from "~/server/api/schemas/games";
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

export const SimilarGamesCarousel = ({ game }: { game: Game }) => {
  const similarGameIds = game?.similar_games ?? [0];
  const { data: similarGames } = api.igdb.getSimilarGames.useQuery(
    {
      ids: similarGameIds,
    },
    {
      enabled: !!game,
    }
  );

  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      breakpoints={carousel_breakpoints}
      modules={[Navigation]}
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
  );
};
