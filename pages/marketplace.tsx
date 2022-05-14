import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useContractRead } from 'wagmi'
import { contractAddress } from '../config/contractAddress'
import { LyingFlatABI } from '../config/LyingFlatABI'
import { ethers } from 'ethers'

const Marketplace: NextPage = () => {
  const [nftsURIS, setNftsURIS] = useState([])
  const { data: totalSupply } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: LyingFlatABI,
    },
    'totalSupply',
  )
console.log(nftsURIS);
  useEffect(() => {
    if (totalSupply) {
      for (let i = 0; i < 20; i++) {
        let images = `https://ipfs.io/ipfs/bafybeicgwytuxvm6p6w6gbigaykwg5xmkwyvbnsx2jq5w7dbvkr4dpvwxy/${i}.jpg`
        i++
        setNftsURIS([...nftsURIS, images])
      }
    }
  }, [totalSupply])

  return (
    <div className="bg-neutral-200 mix-blend-multiply min-h-screen  p-3">
      <h1>Marketplace</h1>
      <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
        {nftsURIS.map((uri, index) => (
          <div key={index} className="w-48 h-48">
            <Image
              src={uri}
              alt={uri}
              layout="responsive"
              width={48}
              height={48}
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marketplace
