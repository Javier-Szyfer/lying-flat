import request, { RequestDocument } from "graphql-request";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAccount } from "wagmi";
import { contractAddress } from "../config/contractAddress";
import { ZORA_INDEX_RINKEBY } from "../config/Zora";
import Frames from "../components/Frames";
import OwnerNFTS from "../components/OwnerNFTS";

export default function OwnedNFTS() {
  const [ownedNFTS, setOwnedNFTS] = useState([]);

  const { data: account } = useAccount({
    suspense: true,
  });

  const fetcher = (query: RequestDocument) =>
    request(ZORA_INDEX_RINKEBY, query);

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
}`;
  const { data: tokens } = useSWR(query, fetcher, { refreshInterval: 10 });
  useEffect(() => {
    if (tokens) {
      setOwnedNFTS(tokens.Token);
    }
    return;
  }, [tokens]);

  if (ownedNFTS.length) {
    return (
      <div>
        <OwnerNFTS ownedNFTS={ownedNFTS} />
      </div>
    );
  } else return <Frames />;
}
