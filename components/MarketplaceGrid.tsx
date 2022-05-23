import { useState } from "react";
import Image from "next/image";
import { formatAddress } from "../utils/address";
import { ZORA_INDEX_RINKEBY, ZORA_MODULE_MANAGER_ABI } from "../config/Zora";
import { useAccount, useContractRead, useEnsName } from "wagmi";
import mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/4.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet
import CreateAskForm from "../components/CreateAskForm";
import CancelAskModal from "../components/CancelAskModal";
import UpdateAskModal from "../components/UpdateAskModal";
import FillAskForm from "../components/FillAskForm";
import ApproveMarketplaceDialog from "../components/ApproveMarketplaceDialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { Tooltip, FF_MESSAGE } from "./Tooltip";

const CheckENS = (address: any) => {
  const ensName = useEnsName({ address });
  return ensName?.data ? ensName.data : formatAddress(address);
};

export function MarketplaceGrid({ allTokensMinted, allV3AsksTokens }) {
  const [approveZoraOpen, setApproveZoraOpen] = useState(false);
  const [createAskState, setCreateAskState] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [cancelAskOpen, setCancelAskOpen] = useState(false);
  const [fillAskState, setFillAskState] = useState(false);
  const [mintedTokenId, setMintTokenID] = useState(0);

  const moduleManagerAddress = mainnetZoraAddresses.ZoraModuleManager;

  const { data: account } = useAccount({
    suspense: true,
  });

  const { data: modulesApproved } = useContractRead(
    {
      addressOrName: moduleManagerAddress,
      contractInterface: ZORA_MODULE_MANAGER_ABI,
    },
    "isModuleApproved",
    {
      args: [account?.address, mainnetZoraAddresses.AsksV1_1],
    }
  );

  const openCreateAskForm = (_tokenId: any) => {
    setMintTokenID(_tokenId);
    setCreateAskState(true);
  };
  const openBuyAskForm = (_tokenId: any) => {
    setMintTokenID(_tokenId);
    setFillAskState(true);
  };

  const checkAsk = (tokenId: any) => {
    const result = allV3AsksTokens.filter(
      (ask: { tokenId: any }) => ask.tokenId === tokenId
    );
    if (result.length > 0) {
      const { askPrice, findersFeeBps, status } = result[0];
      return { askPrice, findersFeeBps, status };
    }
    return;
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
        rtl={false}
        draggable
        pauseOnHover={false}
      />

      <div className="my-24 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full gap-10 mx-auto w-full">
        {createAskState && (
          <CreateAskForm
            createAskState={createAskState}
            setCreateAskState={setCreateAskState}
            tokenId={mintedTokenId}
          />
        )}
        {approveZoraOpen && !modulesApproved && (
          <ApproveMarketplaceDialog
            isOpen={approveZoraOpen}
            setIsOpen={setApproveZoraOpen}
          />
        )}

        {cancelAskOpen && (
          <CancelAskModal
            cancelAskOpen={cancelAskOpen}
            setCancelAskOpen={setCancelAskOpen}
            tokenId={mintedTokenId}
          />
        )}
        {fillAskState && (
          <FillAskForm
            fillAskState={fillAskState}
            setFillAskState={setFillAskState}
            tokenId={mintedTokenId}
            checkAsk={checkAsk}
          />
        )}

        {updateFormOpen && (
          <UpdateAskModal
            tokenId={mintedTokenId}
            updateFormOpen={updateFormOpen}
            setUpdateFormOpen={setUpdateFormOpen}
          />
        )}
        {allTokensMinted &&
          allTokensMinted.map(
            (token: { metadata?: any; owner?: any; tokenId?: any }) => {
              const { owner, tokenId } = token;
              const askData = checkAsk(tokenId);
              const ensName = CheckENS(owner);
              const img = `https://ipfs.io/ipfs/bafybeicgwytuxvm6p6w6gbigaykwg5xmkwyvbnsx2jq5w7dbvkr4dpvwxy/${tokenId}.jpg`;

              return (
                <div
                  key={tokenId}
                  className="flex flex-col border border-stone-500"
                >
                  <div>
                    <Image
                      src={img}
                      alt={`nft # ${tokenId}`}
                      layout="responsive"
                      width={500}
                      height={500}
                      objectFit="cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col divide-y divide-stone-500">
                    <div className="py-2 px-4 w-full flex items-center justify-between ">
                      {owner === account?.address ? (
                        <span className="">
                          Owned by <span className="font-bold">you</span>
                        </span>
                      ) : (
                        <span>{ensName}</span>
                      )}

                      <span>#{tokenId}</span>
                    </div>

                    {/* ======================================== 
                    RENDER NFT BUTTONS + DATA FOR EACH SITUATION
                    ============================================ */}

                    <div className="py-2 px-4 w-full flex items-center justify-between">
                      {/* SALE BUTTON ONLY FOR THE OWNER && IF ZORA MODULES
                    WERE NOT APPROVED => APPROVE THEM FIRST */}
                      {owner === account?.address &&
                        askData?.status !== "ACTIVE" && (
                          <button
                            className="py-[2px] px-3 bg-stone-800 hover:bg-stone-900  text-stone-200"
                            onClick={() =>
                              modulesApproved
                                ? openCreateAskForm(tokenId)
                                : setApproveZoraOpen(true)
                            }
                          >
                            SALE
                          </button>
                        )}
                      {/* IF ASK IS CREATED => SHOW PRICE */}
                      {askData?.askPrice && askData?.status === "ACTIVE" && (
                        <div className="flex items-center text-stone-700 font-light">
                          Price
                          <span className="font-black mx-1 text-stone-900">
                            {ethers.utils.formatEther(askData.askPrice)}
                          </span>
                          ETH
                        </div>
                      )}
                      {askData?.findersFeeBps > 0 && (
                        <>
                          <Tooltip message={FF_MESSAGE}>
                            <span>{` ${askData.findersFeeBps / 10} %`}</span>
                          </Tooltip>
                        </>
                      )}
                      {/* IF THE ASK BELONGS TO THE OWNER THEN SHOW CANCEL AND UPDATE BUTTONS */}
                      {owner === account?.address &&
                        askData?.status === "ACTIVE" && (
                          <div className="flex items-center">
                            <button
                              className="py-[2px] px-3 bg-stone-500  text-stone-200 hover:bg-stone-700"
                              onClick={() => {
                                setCancelAskOpen(true);
                                setMintTokenID(tokenId);
                              }}
                            >
                              CANCEL
                            </button>
                            <button
                              className="py-[2px] px-3 bg-stone-800 hover:bg-stone-900 ml-2  text-stone-200"
                              onClick={() => {
                                setMintTokenID(tokenId);
                                setUpdateFormOpen(true);
                              }}
                            >
                              UPDATE
                            </button>
                          </div>
                        )}
                      {/* NOT THE OWNER BUT THE ASK IS ACTIVE => SHOW FILL BUTTON  && 
                      IF BUYER HAS NOT APPROVED ZORA MODULES YET => APPROVE THEM FIRST*/}
                      {owner !== account?.address &&
                        askData?.status === "ACTIVE" && (
                          <button
                            className="py-[2px] px-3 bg-stone-800 hover:bg-stone-900  text-stone-200"
                            onClick={() => {
                              modulesApproved
                                ? openBuyAskForm(tokenId)
                                : setApproveZoraOpen(true);
                            }}
                          >
                            BUY
                          </button>
                        )}
                      {/* NOT THE OWNER AND THE ASK IS INACTIVE => SHOW OFFER BUTTON && 
                      IF BUYER HAS NOT APPROVED ZORA MODULES YET => APPROVE THEM FIRST*/}
                      {owner !== account?.address &&
                        askData?.status === undefined && (
                          <span>Not listed for sale</span>
                        )}
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </>
  );
}
