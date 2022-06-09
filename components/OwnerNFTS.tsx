import Image from "next/image";
import Link from "next/link";

export default function OwnerNFTS({ ownedNFTS }) {
  if (ownedNFTS?.length) {
    return (
      <div className="relative flex flex-col min-h-screen justify-center items-center text-xl sm:text-2xl ">
        <nav className="fixed top-0 left-0 w-full flex  justify-between items-start p-4 sm:p-8 bg-[#d1ccc0] z-40">
          <p className="tracking-tighter">YOU OWN {ownedNFTS.length} NFTS</p>
          <Link href={"/"} passHref>
            <button className="tracking-tight py-[1px] px-2 sm:py-[2px] sm:px-3 md:text-xl bg-stone-800 hover:bg-stone-900 text-stone-200">
              BACK
            </button>
          </Link>
        </nav>

        <div className="flex flex-col space-y-10 sm:space-y-0 md:flex-row sm:justify-between sm:items-center md:space-x-12 mx-auto my-32 md:my-0 lg:mt-8 ">
          {ownedNFTS.map((nft: any) => {
            const { tokenId } = nft;
            const img = `https://ipfs.io/ipfs/bafybeibkdwfaoi3sfupqhhugatkuampiog5zkqjkvaf6lops2zbhmkojeq/${tokenId}.JPG`;
            return (
              <div
                key={nft.tokenId}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative w-72 h-72 md:w-52 md:h-52 xl:w-72 xl:h-72">
                  <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-400 z-10"></span>
                  <Image
                    src={img}
                    alt={nft?.name}
                    layout="fill"
                    objectFit="contain"
                  />
                  <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-400   z-10"></span>
                </div>
                <span className="p-1 my-2 ">LF #{tokenId}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-52 sm:mt-32 md:mt-16 lg:mt-0 flex flex-col h-screen justify-center items-center bg-[#d1ccc0] ">
      <nav className="fixed top-0 left-0 w-full flex flex-col justify-start items-start p-4 sm:p-8 bg-[#d1ccc0] z-40">
        <p>
          YOU DON&apos;T OWN ANY NFTS YET. <br />
          THIS ART PIECES ARE DISPLAYED TO SHOWCASE THE NFT COLLECTION STYLE.
        </p>
        <div className="flex items-center mt-2">
          <Link href={"/"} passHref>
            <button className="py-[2px] px-3 bg-stone-700 hover:bg-stone-900 text-stone-200">
              MINT
            </button>
          </Link>
          <Link href={"/marketplace"} passHref>
            <button className="py-[2px] px-3 bg-stone-700 hover:bg-stone-900 text-stone-200 ml-2">
              BUY
            </button>
          </Link>
        </div>
      </nav>

      <div className="flex flex-col space-y-10 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center md:space-x-12  mx-auto mt-8 ">
        <div className="relative w-72 h-72 md:w-52 md:h-52 xl:w-72 xl:h-72">
          <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-400 z-10 "></span>
          <Image
            src={"/nfts/LF01.jpg"}
            alt="nft1"
            layout="fill"
            objectFit="contain"
          />
          <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-400 z-10"></span>
        </div>
        <div className="relative w-72 h-72 md:w-52 md:h-52 xl:w-72 xl:h-72">
          <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-400  z-10"></span>

          <Image
            src={"/nfts/LF02.jpg"}
            alt="nft1"
            layout="fill"
            objectFit="contain"
          />
          <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-400  z-10"></span>
        </div>
        <div className=" relative w-72 h-72 md:w-52 md:h-52 xl:w-72 xl:h-72">
          <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-400  z-10"></span>

          <Image
            src={"/nfts/LF03.jpg"}
            alt="nft1"
            layout="fill"
            objectFit="cover"
          />
          <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-400  z-10"></span>
        </div>
      </div>
    </div>
  );
}
