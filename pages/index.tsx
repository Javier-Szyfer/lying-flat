import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import useSWR from "swr";
import { contractAddress } from "../config/contractAddress";
import { useAccount } from "wagmi";
import Frames from '../components/Frames'
import MintForm from '../components/MintForm'
import MintInfo from '../components/MintInfo'
import Link from 'next/link'

const Home: NextPage = () => {
  const [showNFTS, setShowNFTS] = useState(false)
  const [ownedNFTS, setOwnedNFTS] = useState([]);


  const { data: account } = useAccount({
    suspense: true,
  });

  const ENDPOINT = `https://testnets-api.opensea.io/api/v1/assets?owner=${account?.address}&asset_contract_address=${contractAddress}&order_direction=asc&offset=0&limit=20`;
  const fetcher = () => fetch(ENDPOINT).then((res) => res.json());
  const { data: nftsInWallet, error } = useSWR(ENDPOINT, fetcher ,{ refreshInterval: 1000 });



useEffect(() => {
  if (nftsInWallet) {
    setOwnedNFTS(nftsInWallet.assets)
  }
  return 
}, [nftsInWallet])


  return (
    <div className="relative pt-24 md:p-3  flex justify-center items-center lg:bg-[url('../public/bg.png')]  bg-center bg-cover min-h-screen min-w-screen  bg-neutral-200 mix-blend-multiply">
      <Head>
        <title>Lying flat</title>
        <meta name="description" content="Lying flat NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* UPPERMENU */}
      {showNFTS ? (
        <Frames setShowNFTS={setShowNFTS} ownedNFTS={ownedNFTS}/>
      ) : (
        <div className="relative h-[349px] w-[915px] flex  justify-evenly items-center">
          <div className="hidden lg:flex flex-col absolute top-2 left-2 z-50 ">
            <Link href="/marketplace" passHref>
              <span className=" flex items-center justify-center cursor-pointer">
                <span className="  bg-stone-400 border-2 border-stone-900 rounded-full w-4 h-4  mr-2 " />
                <p className="tracking-tighter text-sm">Marketplace</p>
              </span>
            </Link>
            <span className=" absolute top-6   w-32 flex items-center justify-left">
              <button
                className=" bg-stone-400 border-2 border-stone-900 rounded-full w-4 h-4 mr-2"
                onClick={() => setShowNFTS(!showNFTS)}
              ></button>
              {!showNFTS &&  nftsInWallet &&(
                <p className="tracking-tighter text-sm flex-nowrap">{ ownedNFTS?.length ? `${ownedNFTS.length} Artworks` : "Artworks examples" }</p>
              )}
            </span>
          </div>
          <MintInfo />
          <MintForm />
        </div>
      )}
    </div>
  )
}

export default Home
