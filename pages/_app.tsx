import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import merge from 'lodash.merge'
import {
  darkTheme,
  getDefaultWallets,
  Theme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { infuraProvider } from 'wagmi/providers/infura';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public'
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi'
import { ethers } from 'ethers'
import Nav from '../components/Nav'

const provider = new ethers.providers.InfuraProvider(
  "rinkeby",
  process.env.INFURA_ID);

  // const provider = new ethers.providers.AlchemyProvider(
  //   "mainnet",
  //   process.env.ALCHEMY_ID
  // )


const { chains } = configureChains(
  [chain.rinkeby, chain.mainnet],
  [infuraProvider({ infuraId: process.env.INFURA_ID }),
  alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
  publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'LyingFlat',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#202020',
    generalBorder: '#737575',
    connectButtonBackground: '#202020',
    connectButtonText: '#ffffff',
    modalText: "#d6d5d1",
    modalBackground: "#202020",
  },
  fonts: {
    body: '"AUTHENTIC", sans-serif',
    
  },
  radii: {
    actionButton: '0px',
    connectButton: '0px',
    menuButton: '0px',
    modal: '0px',
  },
} as Theme)

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <>
      <Head>
        <title>lying flat</title>
        <meta name="description" content="Lying flat NFT collection" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://res.cloudinary.com/aldi/image/upload/v1654717083/lying%20flat/og_srw9np.jpg"/>
        <meta property="og:title" content="Lying Flat"/>
        <meta property="og:description" content="Lying flat is a NFT marketplace and collection"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={myTheme}>
          <Component {...pageProps} />
          <Nav  />
        </RainbowKitProvider>
      </WagmiConfig>
      </>
    )
  }
}

export default MyApp
