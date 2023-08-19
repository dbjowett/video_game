import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchGames } from "~/hooks/useFetchGames";
import { GameItem } from "../GameItem";
import { type PageTypes } from "../GameList";
import { TabItems } from "../Navbar";
import { Spinner } from "./Spinner";
import Text from "./Text";

import Link from "next/link";
import { TbArrowNarrowRight } from "react-icons/tb";

function Carousel({ type }: { type: PageTypes }) {
  const { data: games, isLoading, isError } = useFetchGames(type);

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

        <Swiper slidesPerView={3} spaceBetween={32} className="h-full  px-4">
          {games.map((game) => (
            <SwiperSlide key={game.id} className="">
              <GameItem {...game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Carousel;
