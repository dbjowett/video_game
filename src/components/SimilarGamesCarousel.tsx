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
    slidesPerView: 2,
    spaceBetween: 20,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  680: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 0,
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
            <Link className="rounded " href={`/game/${game.id}/`}>
              <Image
                loader={imageLoader}
                className="mb-0 w-fit self-center rounded-lg"
                src={game.cover.url}
                quality={60}
                alt={game.name}
                width={10}
                height={10}
              />
              <Text className="line-clamp-1 text-center">{game.name}</Text>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
