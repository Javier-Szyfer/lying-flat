import MarqueeText from "../components/Marquee";
import { ConnectBtn } from "./ConnectBtn";
import { useState } from "react";

export default function Nav() {
  const [marqueeOn, setMarqueeOn] = useState(false);

  return (
    <nav className="  fixed z-50 bottom-0 left-0 w-full px-4 bg-stone-200 lg:bg-stone-200   lg:px-8 py-2 flex justify-between items-center h-16 ">
      {marqueeOn && <MarqueeText />}
      <div className="flex justify-center items-center">
        <h1 className="text-xl text-stone-700 font-bold italic mr-2">
          lying flat
        </h1>
        <button
          className="text-xs py-1 px-2 bg-stone-900 text-stone-50 flex justify-center items-center border border-stone-400 cursor-help "
          onClick={() => setMarqueeOn(!marqueeOn)}
        >
          躺平
        </button>
      </div>
      <ConnectBtn />
    </nav>
  );
}
