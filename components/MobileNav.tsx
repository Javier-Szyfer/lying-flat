import Link from "next/link";

export const MobileNav = ({ ownedNFTS }) => {
  return (
    <nav className="lg:hidden fixed  top-0 left-0 w-full flex flex-col space-y-1 text-2xl sm:text-2xl  justify-between  items-start p-2 sm:p-4 bg-stone-300 z-40">
      <Link href={"/marketplace"} passHref>
        <button className="py-[2px] px-3 border-2 border-stone-900 hover:bg-stone-900 text-stone-900 hover:text-stone-200">
          MARKETPLACE
        </button>
      </Link>
      <Link href={"/your-nfts"} passHref>
        <button className="py-[2px] px-3 border-2 border-stone-900  hover:bg-stone-900 text-stone-900 hover:text-stone-200">
          {ownedNFTS?.length ? (
            <p> YOU OWN {ownedNFTS.length} NFTS</p>
          ) : (
            <p>SEE EXAMPLES</p>
          )}
        </button>
      </Link>
    </nav>
  );
};
