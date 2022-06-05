import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import useSWR from 'swr'
import { contractAddress } from '../config/contractAddress'
import { useAccount } from 'wagmi'
import MintForm from '../components/MintForm'
import MintInfo from '../components/MintInfo'
import { ZORA_INDEX_RINKEBY } from '../config/Zora'
import { request, RequestDocument } from 'graphql-request'
import { MobileNav } from '../components/MobileNav'

const Home: NextPage = () => {
  const [ownedNFTS, setOwnedNFTS] = useState([])

  const { data: account } = useAccount({
    suspense: true,
  })

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

  const { data: tokens } = useSWR(query, fetcher, { refreshInterval: 10 })

  useEffect(() => {
    if (tokens) {
      setOwnedNFTS(tokens.Token)
    }
    return
  }, [tokens])

  return (
    <div className="relative  md:p-3  flex justify-center items-center lg:bg-[url('../public/bg.png')]  bg-center bg-cover min-h-screen min-w-screen  bg-stone-300 ">
      <Head>
        <title>lying flat</title>
        <meta name="description" content="Lying flat NFT collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* UPPERMENU */}
      <div className="relative  flex flex-col items-start w-full h-full px-4 space-y-20 sm:space-y-0  sm:flex-row  sm:items-center    lg:w-[860px] lg:h-[326px] xl:h-[349px] xl:w-[900px] lg:justify-evenly lg:items-center">
        <div className="hidden lg:flex flex-col absolute top-2 left-2 z-50 ">
          <Link href="/marketplace" passHref>
            <span className=" flex items-center justify-center cursor-pointer">
              <span className="  bg-stone-400 border-2 border-stone-900 hover:bg-stone-800 rounded-full w-4 h-4  mr-2 " />
              <p className="tracking-tight text-lg">MARKETPLACE</p>
            </span>
          </Link>
          <Link href={'/your-nfts'} passHref>
            <span className=" absolute top-6 w-60 flex items-center justify-left cursor-pointer ">
              <button className=" bg-stone-400 border-2 border-stone-900 hover:bg-stone-800 rounded-full w-4 h-4 mr-2" />
              {tokens && (
                <p className="tracking-tight text-lg flex-nowrap ">
                  {ownedNFTS?.length
                    ? `${ownedNFTS.length} NFTs`
                    : 'ARTWORKS EXAMPLES'}
                </p>
              )}
            </span>
          </Link>
        </div>
        <MintInfo />
        <MintForm />
      </div>
      {/* < LARGE SCREENS */}
      <MobileNav ownedNFTS={ownedNFTS} />
    </div>
  )
}

export default Home
