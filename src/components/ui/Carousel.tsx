import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchGames } from "~/hooks/useFetchGames";
import { GameItem } from "../GameItem";
import { type PageTypes } from "../GameList";
import { Spinner } from "./Spinner";
import { TabItems } from "../Navbar";

function Carousel({ type }: { type: PageTypes }) {
  const { data: games, isLoading, isError } = useFetchGames(type);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="w-screen">
      <div className="m-auto w-11/12">
        <h1 className="mb-3 text-lg">{TabItems[type].title}</h1>
        <Swiper slidesPerView={3} spaceBetween={30} className="h-full  px-4">
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
