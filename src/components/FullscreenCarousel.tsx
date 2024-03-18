import Image from "next/image";
import { useEffect, useRef } from "react";
import { type Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useWindowSize } from "~/hooks/useWindowSize";
import { type Screenshot } from "~/server/api/schemas/games";
import { screenshotLoader } from "~/utils/gameUtils";
import { NavigationArrows } from "./NavigationArrows";

interface FullscreenCarouselProps {
  screenshots: Screenshot[];
  clickedId: string;
}

export const FullscreenCarousel = ({
  screenshots,
  clickedId,
}: FullscreenCarouselProps) => {
  const swiperRef = useRef<SwiperType>();
  const { width } = useWindowSize();

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
      onBeforeInit={(swiper) => (swiperRef.current = swiper)}
      modules={[Pagination]}
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
      <NavigationArrows
        size={width < 640 ? "md" : "lg"}
        swiperRef={swiperRef}
      />
    </Swiper>
  );
};
