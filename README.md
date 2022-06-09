## Lying flat is an NFT Marketplace powered by ZORA 🌜🌞🌛

The codebase is open for everyone to use it as a boilerplate, customize it and deploy their own.

### Why ZORA?

Because by building on top of [ZORA V3 Marketplace Protocols](https://zine.zora.co/zora-v3) you will be able to fully own your on-chain marketplace, premissionless and in a trustless fashion, with all the functionalities you might need and introducing some unique novel features.
You can lear more about the importance of building of a public marketplace protocol which is itself a -Hyperstructure- [here](https://jacob.energy/hyperstructures.html).

**Note:**
I will not be covering here how to make a ERC721 contract nor uploading artworks/metadata to IPFS or other web3 hosting services.
There's a lot of documentation on this, and you can refer to [Manifold Studio](https://studio.manifold.xyz/) or [Studio721](https://www.721.so/) to make your job easier.

----

You will be guided **step-by-step** on how to get your own marketplace running.

> Clone the repo

```
git clone https://github.com/Javier-Szyfer/lyingflat.git
```

> Install dependencies

```
cd lyingflat
yarn install
```
if using VSCode enter the command `code .` to launch the editor with the repo inside.

Then you just enter `yarn dev` and you'll have **lying flat** locally hosted : )

**Requirements**

- You will need an RPC Ethereum Node provider like [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/) to read and write to the blockchain.
You can get a free API KEY both for Rinkeby and Mainnet. I read that Alchemy will no longer support Rinkeby.

Zora has their contracts deployed on Ropsten, Rinkeby and Mumbai (Polygon) testnets, but i went straight to Rinkeby.

- You will need fake ETH to interact with your contract and the Zora Modules. I recommend [RinkebyFaucet](https://rinkebyfaucet.com/) for this but there are others out there.

- You will need to create a .env file on the root of the project and fill the provider you've chosen with the corresponding API KEY.

``` 
ALCHEMY_ID= Enter your key here without quotes
INFURA_ID= Enter your key here without quotes
```

- Go to the Pages directory and you will see a file named `` app.tsx `` in which you will see i have Infura as my Provider. 
Replace it with your own.
This site is using [Rainbow Kit](https://www.rainbowkit.com/docs/custom-theme) so you will see my custom theming between lines 37 to 56. You can refer to they awesome docs to further customization.

- Go to the config directory and change the ```contractAddress``` file buy entering your own contract address.
- On the same directory change ``LyingFlatABI`` with your contract's ABI.
- Make sure when you're testing to change

`` import { ZORA_INDEX_MAINNET } from '../config/Zora' ``

to

`` import { ZORA_INDEX_RINKEBY } from '../config/Zora'``


**Current Stack, Frameworks and Tooling**

This project uses different client services to build the site and to interact with the Ethereum blockchain, i strongly recommend you to get familiarized
with these in order to gain control over your marketplace.

- [Next.js](https://nextjs.org/) React Framework
- [Tailwind Css](https://tailwindcss.com/) Css Framework
- [Wagmi hooks](https://wagmi.sh/) Dope React hook collection for interacting with Ethereum.
- [Rainbow Kit](https://www.rainbowkit.com/) Best way to connect your wallet.
- [Ethers.js](https://docs.ethers.io/v5/getting-started/) Ethereum javascript client library.


This was made by [javvvs.eth](https://twitter.com/javvvs_) if you want to follow for more content like this.
Also send me a dm if you have questions about this guide.

Good luck :)
