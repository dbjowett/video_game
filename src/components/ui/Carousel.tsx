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

export const Carousel = ({ type }: { type: PageTypes }) => {
  const { data: games, isLoading, isError, refetch } = useFetchGames(type);
  const swiperRef = useRef<SwiperType>();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="w-screen">
      <div className="m-auto w-11/12">
        <div className="mb-4 flex justify-between align-middle">
          <Text as="h1" className="" size="lg">
            {TabItems[type].title}
          </Text>
          <Link className="self-end" href={TabItems[type].param}>
            <span className="hover:border-b-1 flex items-center gap-1 rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-300 hover:text-gray-600">
              See More <TbArrowNarrowRight />
            </span>
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
                <GameItem refetch={refetch} game={game} />
              </SwiperSlide>
            ))}
          </>
          <div>
            <button
              className="absolute top-1/2 z-20 rounded-full bg-white p-2 opacity-80"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <TbChevronLeft size={16} />
            </button>
            <button
              className="absolute right-0 top-1/2 z-20 rounded-full bg-white p-2 opacity-80"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <TbChevronRight size={16} />
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  );
};
