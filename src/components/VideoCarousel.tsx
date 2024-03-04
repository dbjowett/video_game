import { useRef } from "react";
import { type Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Video } from "~/server/api/schemas/games";
import { NavigationArrows } from "./NavigationArrows";

interface IFrameProps {
  video: Video;
}

const IFrame = ({ video }: IFrameProps) => {
  return (
    <div className="relative aspect-video h-full w-full">
      <iframe
        className="absolute left-0 top-0 h-full w-full rounded-xl "
        src={`https://www.youtube.com/embed/${video.video_id}`}
        title={video.name}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        rel="noopener"
      />
    </div>
  );
};

interface VideoCarouselProps {
  videos: Video[];
}

export const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const swiperRef = useRef<SwiperType>();
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="relative px-[1px]"
    >
      {videos?.length &&
        videos?.map((video) => (
          <SwiperSlide key={video.id}>
            <IFrame video={video} />
          </SwiperSlide>
        ))}
      <NavigationArrows size="sm" swiperRef={swiperRef} />
    </Swiper>
  );
};
