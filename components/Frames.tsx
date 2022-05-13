import Image from "next/image";

export default function Frames({ setShowNFTS, ownedNFTS }) {
  if (ownedNFTS.length) {
    return (
      <div className="relative flex flex-col h-screen justify-center items-center ">
        <div className="hidden lg:flex justify-between items-center space-x-8  mx-auto ">
          {ownedNFTS.map((nft) => (
            <div className="relative w-52 h-52" key={nft.id}>
              <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-300 z-10"></span>
              <Image
                src={nft.image_original_url}
                alt={nft.name}
                layout="fill"
                objectFit="contain"
              />
              <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-300   z-10"></span>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="mt-2">
            CONGRATULATIONS, YOU OWN {ownedNFTS.length} ARTWORKS
          </p>
          <p className="cursor-pointer" onClick={() => setShowNFTS(false)}>
            BACK
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      <div className="hidden lg:flex justify-between items-center space-x-8  mx-auto   ">
        <div className="relative w-52 h-52">
          <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-300 z-10"></span>
          <Image
            src={"/nfts/LF01.jpg"}
            alt="nft1"
            layout="fill"
            objectFit="contain"
          />
          <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-300   z-10"></span>
        </div>
        <div className="relative w-52 h-52 ">
          <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-300  z-10"></span>

          <Image
            src={"/nfts/LF02.jpg"}
            alt="nft1"
            layout="fill"
            objectFit="contain"
          />
          <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-300  z-10"></span>
        </div>
        <div className=" relative w-52 h-52">
          <span className="absolute top-[-2px] left-[-16px] w-10 h-4 rotate-[-45deg] bg-stone-300  z-10"></span>

          <Image
            src={"/nfts/LF03.jpg"}
            alt="nft1"
            layout="fill"
            objectFit="cover"
          />
          <span className="absolute top-[-2px] right-[-16px] w-10 h-4 rotate-[45deg] bg-stone-300  z-10"></span>
        </div>
      </div>
      <p className="mt-4">
        THIS ART PIECES ARE DISPLAYED TO SHOWCASE THE NFT COLLECTION STYLE
      </p>
      <p className="cursor-pointer p-2" onClick={() => setShowNFTS(false)}>
        BACK
      </p>
    </div>
  );
}
