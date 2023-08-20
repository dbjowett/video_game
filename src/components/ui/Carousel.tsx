import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useRef } from "react";
import { type Swiper as SwiperType } from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchGames } from "~/hooks/useFetchGames";
import { GameItem } from "../GameItem";
import { TabItems, type PageTypes } from "../Navbar";
import { Spinner } from "./Spinner";
import Text from "./Text";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  TbArrowNarrowRight,
  TbChevronLeft,
  TbChevronRight,
} from "react-icons/tb";
import { useWindowSize } from "~/hooks/useWindowSize";

const breakPoints = {
  sm: {
    max_width: 640,
    slide_count: 1,
  },
  md: {
    max_width: 768,
    slide_count: 2,
  },
  lg: {
    max_width: 1024,
    slide_count: 3,
  },
  xl: {
    max_width: 1280,
    slide_count: 4,
  },
  xxl: {
    max_width: 1900,
    slide_count: 5,
  },
};
type bpKey = keyof typeof breakPoints;

export const Carousel = ({ type }: { type: PageTypes }) => {
  const { data: games, isLoading, isError } = useFetchGames(type);
  const [numSlides, setNumSlides] = useState(breakPoints.lg.slide_count);
  const { width } = useWindowSize(400);
  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    let numSlides = breakPoints.xxl.slide_count; // default
    for (const key of Object.keys(breakPoints)) {
      if (width < breakPoints[key as bpKey].max_width) {
        numSlides = breakPoints[key as bpKey].slide_count;
        break;
      }
    }
    setNumSlides(numSlides);
  }, [width]);

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
          slidesPerView={numSlides}
          spaceBetween={32}
          className="relative h-full px-4"
          modules={[Scrollbar, Navigation]}
          scrollbar={{ hide: true }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          <>
            {games.map((game) => (
              <SwiperSlide key={game.id} className="h-auto">
                <GameItem source={type} game={game} />
              </SwiperSlide>
            ))}
          </>
          <div>
            <button
              className="absolute top-1/2 z-20 rounded-full"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <TbChevronLeft size={16} />
            </button>
            <button
              className="absolute right-0 top-1/2 z-20 rounded-full"
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
