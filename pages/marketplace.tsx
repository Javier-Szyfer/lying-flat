import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import {  ZORA_INDEX_MAINNET } from '../config/Zora'
import { request, RequestDocument } from 'graphql-request'
import { MarketplaceGrid } from '../components/MarketplaceGrid'
import { allMintedTokensQuery, allV3Asks } from '../lib/ZoraQueries'

const Marketplace: NextPage = () => {
  const fetcher = (query: RequestDocument) => request(ZORA_INDEX_MAINNET, query)

  const { data: allTokensMinted } = useSWR(allMintedTokensQuery, fetcher, {
    refreshInterval: 5,
  })
  const { data: allV3AsksTokens } = useSWR(allV3Asks, fetcher, {
    refreshInterval: 5,
  })
  return (
    <div className=" sm:pt-10 md:pt-18 md:p-3  min-h-screen min-w-screen  ">
      <Head>
        <title>lying flat - marketplace</title>
        <meta name="description" content="Lying flat NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="tracking-tight  flex items-center fixed z-30 text-2xl backdrop-blur-sm top-0 left-0 h-16 w-full px-8 lg:px-12 text-stone-800">
        <span >MARKETPLACE</span>
        <span className="mx-2">/</span>
        <Link href="/" passHref>
          <a className="hover:text-stone-900 hover:font-bold "> MINT</a>
        </Link>
      </nav>
      {allTokensMinted && allV3AsksTokens ?
        <MarketplaceGrid allTokensMinted={allTokensMinted.Token} allV3AsksTokens={allV3AsksTokens.V3Ask} />
       : (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-10 w-10 text-stone-500"
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
      )}
    </div>
  )
}

export default Marketplace
