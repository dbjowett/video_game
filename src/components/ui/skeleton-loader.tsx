import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

interface SkeletonConfig {
  count: number;
  gap: string;
  showOn?: number;
}

const configurations = [
  { count: 1, gap: "", showOn: 641 },
  { count: 2, gap: "gap-[20px]", showOn: 768 },
  { count: 3, gap: "gap-[30px]", showOn: 1024 },
  { count: 4, gap: "gap-[40px]", showOn: 1280 },
  { count: 5, gap: "gap-[50px]", showOn: undefined },
] as const;

const getSkeleton = (width: number): SkeletonConfig => {
  const matchingConfigIndex = configurations.findIndex((item) =>
    item?.showOn ? item.showOn > width : false
  );
  const finalConfig =
    matchingConfigIndex !== -1
      ? configurations[matchingConfigIndex]
      : configurations[configurations.length - 1];

  return finalConfig!;
};

export const SkeletonLoader = () => {
  const [skeleton, setSkeleton] = useState<SkeletonConfig | null>(null);

  useEffect(() => {
    setSkeleton(getSkeleton(window.innerWidth));
    const windowSizeHandler = () => {
      const newSkeleton = getSkeleton(window.innerWidth);
      setSkeleton(newSkeleton);
    };
    window.addEventListener("resize", windowSizeHandler);
    return () => window.removeEventListener("resize", windowSizeHandler);
  }, []);

  if (!skeleton) return null;

  return (
    <div className="flex h-full w-full justify-around gap-4 overflow-hidden rounded-xl px-4">
      {Array.from({ length: skeleton?.count }).map((_, idx) => (
        <div
          key={idx}
          className="flex w-full flex-col space-y-3 rounded-xl border border-border"
        >
          <Skeleton className="h-[432px] w-[100%] rounded-xl" />
          <div className="space-y-2 px-[12px] py-[16px]">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>
      ))}
    </div>
  );
};
