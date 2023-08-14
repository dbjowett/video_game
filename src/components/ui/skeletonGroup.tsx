import { Skeleton } from "./skeleton";
export const SkeletonGroup = ({
  numberOfCards,
  title,
}: {
  numberOfCards: number;
  title?: string;
}) => {
  const skeletonArray = Array.from(
    { length: numberOfCards },
    (_, index) => index
  );
  return (
    <>
      {title ? (
        <div className=" mb-3 flex justify-between">
          <h1 className="text-start align-baseline text-xl font-bold">
            {title}
          </h1>
        </div>
      ) : null}
      <div className="grid  gap-8 sm:grid-cols-2 md:grid-cols-3">
        {skeletonArray.map((num) => {
          return (
            <div
              className="flex h-[300px] w-60 flex-col gap-4 rounded-lg bg-white"
              key={num}
            >
              <div className="p-3">
                <Skeleton className="w-100 h-28 rounded bg-slate-200 px-5" />
              </div>
              <div className="ml-3 flex flex-col justify-center gap-2.5 py-2 align-middle ">
                <Skeleton className="h-3 w-[95%]  bg-slate-200" />
                <Skeleton className="h-3 w-[95%]  bg-slate-200" />
                <Skeleton className="h-3 w-[95%] bg-slate-200" />
                <Skeleton className="h-3 w-[95%] bg-slate-200" />
                <Skeleton className="h-3 w-[95%] bg-slate-200" />
                <Skeleton className="h-3 w-[95%] bg-slate-200" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
