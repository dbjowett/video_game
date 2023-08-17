export const Spinner = () => {
  return (
    <div className="absolute bottom-1/2 right-1/2  translate-x-1/2 translate-y-1/2 transform ">
      <div className="h-10 w-10 animate-spin  rounded-full border-4 border-solid border-blue-400 border-t-transparent"></div>
    </div>
  );
};
