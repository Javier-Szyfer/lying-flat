import { ReactNode } from "react";
export const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
        <span className=" max-w-48 w-48 relative z-10 p-2 text-xs leading-none text-stone-100 whitespace-no-wrap bg-stone-800 shadow-lg rounded-md">
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-stone-800"></div>
      </div>
    </div>
  );
};

export const FF_MESSAGE =
  "This item contains a Finder's Fee (included in the price)";
