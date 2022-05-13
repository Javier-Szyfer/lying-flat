import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import merge from 'lodash.merge'
import {
  apiProvider,
  configureChains,
  darkTheme,
  getDefaultWallets,
  Theme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'

import { chain, createClient, WagmiProvider } from 'wagmi'
import { ethers } from 'ethers'

const provider = new ethers.providers.InfuraProvider(
  "rinkeby",
  process.env.INFURA_ID);

const { chains } = configureChains(
  [chain.rinkeby],
  [apiProvider.infura(process.env.INFURA_ID), apiProvider.fallback()],
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
    accentColor: '#c9c9c9',
    generalBorder: '#202020',
    connectButtonBackground: '#202020',
    accentColorForeground: '#202020',
  },
  fonts: {
    body: 'FRANKLIN',
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
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={myTheme}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiProvider>
    )
  }
}

export default MyApp
