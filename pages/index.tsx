import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { contractAddress } from '../config/contractAddress'
import { useAccount } from 'wagmi'
import MintForm from '../components/MintForm'
import MintInfo from '../components/MintInfo'
import { ZORA_INDEX_MAINNET } from '../config/Zora'
import { request, RequestDocument } from 'graphql-request'
import { MobileNav } from '../components/MobileNav'

const Home: NextPage = () => {
  const [ownedNFTS, setOwnedNFTS] = useState([])

  const { data: account } = useAccount({
    suspense: true,
  })

  const fetcher = (query: RequestDocument) => request(ZORA_INDEX_MAINNET, query)

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
    <div className="relative  flex justify-center items-center lg:bg-[url('../public/bg.png')] xl:bg-transparent bg-center bg-fixed  min-h-screen min-w-screen   ">
      {/* UPPERMENU */}
      <div className="relative  mt-5  flex flex-col items-start w-full h-full px-4 space-y-20 sm:space-y-0  sm:flex-row  sm:items-center  lg:w-[1100px] lg:h-[460px] xl:h-[460px] xl:w-[1217px] lg:justify-evenly lg:items-center">
        <div className="hidden lg:flex flex-col absolute top-3 left-6 z-50 ">
          <Link href="/marketplace" passHref>
            <span className=" flex items-center justify-center cursor-pointer">
              <span className="  bg-stone-400 border-2 border-stone-900 hover:bg-stone-800 rounded-full w-4 h-4  mr-2 " />
              <p className="tracking-tight text-xl">MARKETPLACE</p>
            </span>
          </Link>
          <Link href={'/your-nfts'} passHref>
            <span className=" absolute top-7 w-72 flex items-center justify-left cursor-pointer ">
              <button className=" bg-stone-400 border-2 border-stone-900 hover:bg-stone-800 rounded-full w-4 h-4 mr-2" />
              {tokens && (
                <p className="tracking-tight text-xl flex-nowrap ">
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
