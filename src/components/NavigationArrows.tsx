import { useEffect, useState, type MutableRefObject } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { type Swiper as SwiperType } from "swiper";

const sizeObject = {
  sm: {
    height: 40,
    width: 40,
    icon_size: 20,
  },
  md: {
    height: 50,
    width: 50,
    icon_size: 26,
  },
  lg: {
    height: 70,
    width: 70,
    icon_size: 40,
  },
} as const;

interface NavigationArrowsProps {
  swiperRef: MutableRefObject<SwiperType | undefined>;
  size: "sm" | "md" | "lg";
}

export const NavigationArrows = ({
  swiperRef,
  size,
}: NavigationArrowsProps) => {
  const [isStart, setIsStart] = useState<boolean | null>(true);
  const [isEnd, setIsEnd] = useState<boolean | null>(false);

  useEffect(() => {
    if (!swiperRef.current) return;

    const handleSlideChange = () => {
      const newIsStart = !!swiperRef.current?.isBeginning;
      const newIsEnd = !!swiperRef.current?.isEnd;
      if (newIsStart !== isStart) {
        setIsStart(newIsStart);
      }
      if (newIsEnd !== isEnd) {
        setIsEnd(newIsEnd);
      }
    };

    swiperRef?.current.on("slideChange", handleSlideChange);
  }, [isEnd, isStart, swiperRef]);

  const { icon_size, height, width } = sizeObject[size];
  const marginTop = (height / 2) * -1;

  return (
    <>
      {!isStart && (
        <button
          style={{ height, width, marginTop }}
          className="absolute left-2 top-[50%] z-20 flex items-center justify-center rounded-full bg-accent p-2 opacity-70 hover:opacity-75"
          onClick={() => swiperRef?.current?.slidePrev()}
        >
          <TbChevronLeft size={icon_size} />
        </button>
      )}

      {!isEnd && (
        <button
          style={{ height, width, marginTop }}
          className="absolute right-2 top-[50%] z-20 flex items-center justify-center  rounded-full bg-accent p-2 opacity-70  hover:opacity-75"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <TbChevronRight size={icon_size} className="ml-[2px]" />
        </button>
      )}
    </>
  );
};
