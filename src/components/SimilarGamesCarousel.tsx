import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { type Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Text from "~/components/ui/Text";
import { type DetailedGame } from "~/server/api/schemas/games";
import { api } from "~/utils/api";
import { imageLoader } from "~/utils/gameUtils";
import { NavigationArrows } from "./NavigationArrows";

const carousel_breakpoints = {
  420: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  580: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  680: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 50,
  },
};

export const SimilarGamesCarousel = ({ game }: { game: DetailedGame }) => {
  const similarGameIds = game?.similar_games ?? [0];
  const swiperRef = useRef<SwiperType>();

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
      onBeforeInit={(swiper) => (swiperRef.current = swiper)}
      pagination={{
        clickable: true,
      }}
      breakpoints={carousel_breakpoints}
      className="relative"
    >
      {similarGames?.length &&
        similarGames?.map((game) => (
          <SwiperSlide key={game.id} className="m-0 mr-5 h-auto">
            <Link className="relative rounded" href={`/game/${game.id}/`}>
              <Image
                loader={imageLoader}
                className="mb-0 w-fit self-center rounded-lg"
                src={game.cover.url}
                quality={60}
                alt={game.name}
                width={10}
                height={10}
              />
              <div className="absolute bottom-0 w-full rounded-b bg-background opacity-70">
                <Text className="line-clamp-2 text-center">{game.name}</Text>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      <NavigationArrows size="sm" swiperRef={swiperRef} />
    </Swiper>
  );
};
