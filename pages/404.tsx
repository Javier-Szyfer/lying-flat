import React from "react";
import Link from "next/link";

export const error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      You are in the wrong place.
      <button className="underline mt-2">
        <Link href="/" passHref>
          Go back home
        </Link>
      </button>
    </div>
  );
};

export default error;
