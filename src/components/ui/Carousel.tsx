import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useRef } from "react";
import { type Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchGames } from "~/hooks/useFetchGames";
import { GameItem } from "../GameItem";
import { TabItems, type PageTypes } from "../Navbar";
import { Spinner } from "./Spinner";
import Text from "./Text";

import Link from "next/link";
import {
  TbArrowNarrowRight,
  TbChevronLeft,
  TbChevronRight,
} from "react-icons/tb";
import { type FavouriteGame } from "~/pages/api/utils/types";
import { Badge } from "./badge";

const break_points = {
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
  1280: {
    slidesPerView: 5,
    spaceBetween: 50,
  },
};

interface CarouselProps {
  type: PageTypes;
  faveGames: FavouriteGame[] | undefined;
  refetchFavourites: () => void;
}

export const Carousel = ({
  type,
  faveGames,
  refetchFavourites,
}: CarouselProps) => {
  const { data: games, isLoading, isError } = useFetchGames(type);
  const swiperRef = useRef<SwiperType>();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="w-screen">
      <div className="m-auto w-11/12">
        <div className="mb-4 flex justify-between align-middle">
          <Text as="h1" size="xl">
            {TabItems[type].title}
          </Text>
          <Link className="self-end" href={TabItems[type].param}>
            <Badge>
              See More <TbArrowNarrowRight />
            </Badge>
          </Link>
        </div>

        <Swiper
          slidesPerView={1}
          breakpoints={break_points}
          className="relative h-full px-4"
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          <>
            {games.map((game) => (
              <SwiperSlide key={game.id} className="h-auto">
                <GameItem
                  refetchFavourites={refetchFavourites}
                  isFavourite={
                    faveGames?.some((g) => g.id === game.id.toString()) ?? false
                  }
                  game={game}
                />
              </SwiperSlide>
            ))}
          </>
          <div>
            <button
              className="absolute top-1/2 z-20 h-[40px] w-[40px] rounded-full border border-accent-foreground bg-accent p-2 opacity-90"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <TbChevronLeft size={20} />
            </button>
            <button
              className="absolute right-0 top-1/2 z-20 h-[40px] w-[40px] rounded-full border  border-accent-foreground bg-accent  p-2 opacity-90"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <TbChevronRight size={20} className="ml-[2px]" />
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  );
};
