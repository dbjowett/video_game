import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { type Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Screenshot } from "~/pages/api/utils/types";
import { screenshotLoader } from "~/utils/game";

interface FullscreenCarouselProps {
  screenshots: Screenshot[];
  clickedId: string;
}

export const FullscreenCarousel = ({
  screenshots,
  clickedId,
}: FullscreenCarouselProps) => {
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

  useEffect(() => {
    const clickedIndex = screenshots.findIndex(
      (pic) => pic.image_id === clickedId
    );
    if (clickedIndex < 0) return;
    swiperRef.current?.slideTo(clickedIndex, 300);
  }, [clickedId, screenshots]);

  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      modules={[Navigation, Pagination]}
      onSlideChange={updateButtons}
      className="relative"
    >
      {screenshots?.length &&
        screenshots?.map((screenshot) => (
          <SwiperSlide key={screenshot.id} className="m-0 h-auto">
            <Image
              loader={(props) =>
                screenshotLoader({ ...props, quality: 8, maxSize: true })
              }
              className="mb-0 w-fit rounded-lg"
              src={screenshot.image_id}
              alt={`Screenshot: ${screenshot.id}`}
              width={500}
              height={500}
            />
          </SwiperSlide>
        ))}

      <div>
        {!isStart && (
          <button
            className="absolute left-4 top-[50%] z-20 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-accent p-2 opacity-80"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <TbChevronLeft size={40} />
          </button>
        )}

        {!isEnd && (
          <button
            className="absolute right-4 top-[50%] z-20 flex h-[80px] w-[80px] items-center justify-center  rounded-full bg-accent p-2 opacity-80 "
            onClick={() => swiperRef.current?.slideNext()}
          >
            <TbChevronRight size={40} className="ml-[2px]" />
          </button>
        )}
      </div>
    </Swiper>
  );
};
