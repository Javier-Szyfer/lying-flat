import { contractAddress } from "../config/contractAddress";

export const allMintedTokensQuery = `{
    Token(
      where: { address: { _eq: "${contractAddress}" } }
      order_by: { tokenId: asc }
      limit: 20
    ) {
      tokenId
      address
      minter
      owner
      metadata {
        json
      }
    }
  }`;

export const allV3Asks = `{
    V3Ask(where: {tokenContract: {_eq: "${contractAddress}"}}, order_by: {tokenId:asc}, limit: 20) {
      address
      askCurrency
      askPrice
      buyer
      finder
      findersFeeBps
      id
      lastFilledEvent {
        id
      }
      seller
      sellerFundsRecipient
      status
      tokenContract
      tokenId
    }
  }`;
