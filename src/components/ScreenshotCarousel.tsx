import { MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef } from "react";
import { type Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Screenshot } from "~/server/api/schemas/games";
import { screenshotLoader } from "~/utils/gameUtils";
import { FullscreenCarousel } from "./FullscreenCarousel";
import { useModal } from "./ModalProvider";
import { NavigationArrows } from "./NavigationArrows";

const carousel_breakpoints = {
  420: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  580: {
    slidesPerView: 1,
    spaceBetween: 10,
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

interface ScreenshotCarouselProps {
  screenshots: Screenshot[];
}

export const ScreenshotCarousel = ({
  screenshots,
}: ScreenshotCarouselProps) => {
  const { openModal } = useModal();
  const swiperRef = useRef<SwiperType>();

  const setSelectedImage = (id: string) =>
    openModal(<FullscreenCarousel clickedId={id} screenshots={screenshots} />);

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
      className="relative px-[1px]"
    >
      {screenshots?.length &&
        screenshots?.map((screenshot) => (
          <SwiperSlide key={screenshot.id} className="m-0 mr-5 h-auto">
            <div
              className="relative flex h-full cursor-pointer flex-col justify-center rounded-xl bg-slate-100 align-middle text-gray-500 shadow hover:bg-slate-200"
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
              <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground opacity-30">
                <MagnifyingGlass weight="bold" size={20} color="black" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      <NavigationArrows size="sm" swiperRef={swiperRef} />
    </Swiper>
  );
};
