import Image from "next/image";
import { useRef, useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { type Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Game } from "~/server/api/schemas/games";
import { screenshotLoader } from "~/utils/game";
import { FullscreenCarousel } from "./FullscreenCarousel";
import { useModal } from "./ModalProvider";

const carousel_breakpoints = {
  420: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  680: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
};

export const ScreenshotCarousel = ({ game }: { game: Game }) => {
  const { openModal } = useModal();
  const screenshots = game.screenshots;
  const swiperRef = useRef<SwiperType>();
  const [isStart, setIsStart] = useState<boolean | null>(true);
  const [isEnd, setIsEnd] = useState<boolean | null>(false);

  const updateButtons = () => {
    const newIsStart = !!swiperRef.current?.isBeginning;
    const newIsEnd = !!swiperRef.current?.isEnd;
    if (newIsStart !== isStart) {
      setIsStart(newIsStart);
    }
    if (newIsEnd !== isEnd) {
      setIsEnd(newIsEnd);
    }
  };

  const setSelectedImage = (id: string) => {
    openModal(<FullscreenCarousel clickedId={id} screenshots={screenshots} />);
  };

  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      breakpoints={carousel_breakpoints}
      modules={[Navigation]}
      onSlideChange={updateButtons}
      className="relative"
    >
      {screenshots?.length &&
        screenshots?.map((screenshot) => (
          <SwiperSlide key={screenshot.id} className="m-0 mr-5 h-auto">
            <div
              className="flex h-full flex-col justify-center rounded-xl bg-slate-100 align-middle text-gray-500 shadow hover:bg-slate-200"
              onClick={() => setSelectedImage(screenshot.image_id)}
            >
              <Image
                loader={(props) =>
                  screenshotLoader({ ...props, quality: 7, maxSize: false })
                }
                className="mb-0 w-fit rounded-lg"
                src={screenshot.image_id}
                alt={`Screenshot: ${screenshot.id}`}
                width={10}
                height={10}
              />
            </div>
          </SwiperSlide>
        ))}

      <div>
        {!isStart && (
          <button
            className="absolute left-1 top-[40%] z-20 h-[40px] w-[40px] rounded-full bg-accent p-2 opacity-80"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <TbChevronLeft size={20} />
          </button>
        )}

        {!isEnd && (
          <button
            className="absolute right-1 top-[40%] z-20 h-[40px] w-[40px] rounded-full bg-accent  p-2 opacity-80"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <TbChevronRight size={20} className="ml-[2px]" />
          </button>
        )}
      </div>
    </Swiper>
  );
};
