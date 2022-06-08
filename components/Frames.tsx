import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Frames() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);
  if (show) {
    return (
      <div className="my-56 sm:mt-32 md:mt-16 lg:mt-0 flex flex-col min-h-screen justify-center items-center ">
        <nav className="fixed top-0 left-0 w-full flex flex-col justify-start items-start p-4 sm:p-8 bg-[#d1ccc0] z-40">
          <p className="">
            YOU DON&apos;T OWN ANY NFTS YET. <br />
            THIS ART PIECES ARE DISPLAYED TO SHOWCASE SOME OF THE NFTS INCLUDED.
          </p>
          <div className="flex items-center mt-2">
            <Link href={"/"} passHref>
              <button className="py-[2px] px-3 bg-stone-800 hover:bg-stone-900 text-stone-200">
                MINT
              </button>
            </Link>
            <Link href={"/marketplace"} passHref>
              <button className="py-[2px] px-3 bg-stone-800 hover:bg-stone-900 text-stone-200 ml-2">
                BUY
              </button>
            </Link>
          </div>
        </nav>

        <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row md:justify-between md:items-center md:space-x-12  mx-auto mt-8 ">
          <div className="relative w-72 h-72 md:w-52 md:h-52 xl:w-72 xl:h-72 border-2 border-stone-600">
            <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-400 z-10 "></span>
            <Image
              src={
                "https://res.cloudinary.com/aldi/image/upload/v1654703821/lying%20flat/15_hcfu6a.jpg"
              }
              alt="Artwork Example"
              layout="fill"
              objectFit="contain"
            />
            <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-400 z-10"></span>
          </div>
          <div className="relative w-72 h-72 md:w-52 md:h-52 xl:w-72 xl:h-72 border-2 border-stone-600">
            <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-400  z-10"></span>
            <Image
              src={
                "https://res.cloudinary.com/aldi/image/upload/v1654703839/lying%20flat/17_kpnhly.jpg"
              }
              alt="Artwork Example"
              layout="fill"
              objectFit="cover"
            />
            <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-400  z-10"></span>
          </div>
          <div className=" relative w-72 h-72 md:w-52 md:h-52 xl:w-72 xl:h-72 border-2 border-stone-600">
            <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-400  z-10"></span>
            <Image
              src={
                "https://res.cloudinary.com/aldi/image/upload/v1654703806/lying%20flat/04_y8ubxk.jpg"
              }
              alt="Artwork Example"
              layout="fill"
              objectFit="contain"
            />

            <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-400  z-10"></span>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="flex flex-col h-screen justify-center items-center w-screen">
        <svg
          className="animate-spin -ml-1 mr-3 h-12 w-12 text-stone-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
}
