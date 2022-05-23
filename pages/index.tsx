import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import useSWR from "swr";
import { contractAddress } from "../config/contractAddress";
import { useAccount } from "wagmi";
import Frames from '../components/Frames'
import MintForm from '../components/MintForm'
import MintInfo from '../components/MintInfo'
import { ZORA_INDEX_RINKEBY } from "../config/Zora";
import { request, RequestDocument } from 'graphql-request'


const Home: NextPage = () => {
  const [showNFTS, setShowNFTS] = useState(false)
  const [ownedNFTS, setOwnedNFTS] = useState([]);


  const { data: account } = useAccount({
    suspense: true,
  });

  const fetcher = (query: RequestDocument) => request(ZORA_INDEX_RINKEBY, query)

  const query = `{
    Token(
      where: { address: { _eq: "${contractAddress}"}, owner: { _eq: "${account?.address}" } }
      order_by: { tokenId: asc }
    ) {
      tokenId
      address
      owner
      metadata {
        json
      }
    }
  }`

const { data: tokens } = useSWR(query, fetcher, { refreshInterval: 60 });

console.log('ownedNFTS', tokens)

useEffect(() => {
  if (tokens) {
    setOwnedNFTS(tokens.Token)
  }
  return 
}, [tokens])


  return (
    <div className="relative  md:p-3  flex justify-center items-center lg:bg-[url('../public/bg.png')]  bg-center bg-cover min-h-screen min-w-screen  bg-stone-300 ">
      <Head>
        <title>Lying flat</title>
        <meta name="description" content="Lying flat NFT collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* UPPERMENU */}
      {showNFTS ? (
        <Frames setShowNFTS={setShowNFTS} ownedNFTS={ownedNFTS}/>
      ) : (
        <div className="relative  flex flex-col w-full h-full px-4 space-y-20 md:space-y-0 items-start md:flex-row lg:h-[349px] lg:w-[915px] md:justify-evenly md:items-center">
          <div className="hidden lg:flex flex-col absolute top-2 left-2 z-50 ">
            <Link href="/marketplace" passHref>
              <span className=" flex items-center justify-center cursor-pointer">
                <span className="  bg-stone-400 border-2 border-stone-900 rounded-full w-4 h-4  mr-2 " />
                <p className="tracking-tighter text-sm">Marketplace</p>
              </span>
            </Link>
            <span className=" absolute top-6 w-32 flex items-center justify-left">
              <button
                className=" bg-stone-400 border-2 border-stone-900 rounded-full w-4 h-4 mr-2"
                onClick={() => setShowNFTS(!showNFTS)}
              />
              {!showNFTS &&  tokens &&(
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

