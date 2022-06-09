import { Dialog, Transition } from "@headlessui/react";
import { Fragment, SyntheticEvent, useState, useEffect } from "react";
import Image from "next/image";
import { contractAddress } from "../config/contractAddress";
import mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet
import { AsksV11__factory } from "@zoralabs/v3/dist/typechain/factories/AsksV11__factory";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";
import {
  useSigner,
  useWaitForTransaction,
  useBalance,
  useAccount,
} from "wagmi";
import { BigNumber, ethers } from "ethers";
import { toast } from "react-toastify";
import Link from "next/link";

export default function FillAskForm({
  fillAskState,
  setFillAskState,
  tokenId,
  checkAsk,
}) {
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState("");
  const [askPrice, setAskPrice] = useState<any>(0);
  const [findersFeeBps, setFindersFeeBps] = useState<any>(0);
  const [findersFeeAddress, setFindersFeeAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );

  console.log(findersFeeAddress, findersFeeBps);
  const [showFFInput, setShowFFInput] = useState(false);

  const { data: signer } = useSigner();

  const { data: account } = useAccount({
    suspense: true,
  });

  const balance = useBalance({
    addressOrName: account.address,
  });

  // Initialize Asks v1.1 Module Contract
  const askModuleContract = AsksV11__factory.connect(
    mainnetZoraAddresses.AsksV1_1,
    signer
  );
  function closeModal() {
    setFillAskState(false);
  }

  const handleFillAsk = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("about to fill an ask");
    if (balance < askPrice) {
      toast.error("Insufficient balance", {
        toastId: "balance-insufficient-error",
      });
      return;
    }
    setProcessing(true);
    let id = parseInt(tokenId);
    const askCurrency = "0x0000000000000000000000000000000000000000";
    let priceInETH = ethers.utils.formatEther(askPrice);
    try {
      const receipt = await askModuleContract.fillAsk(
        contractAddress,
        id,
        askCurrency,
        ethers.BigNumber.from(askPrice),
        findersFeeAddress,
        {
          value: ethers.utils.parseEther(priceInETH),
        }
      );
      {
        receipt?.hash && setHash(receipt.hash);
      }
    } catch (e) {
      setProcessing(false);
      setFillAskState(false);
      console.log(e);
      toast.error(e.message, {
        toastId: "fill-ask-error",
      });
    }
  };

  const { data: waitForTransaction } = useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      setProcessing(false);
      toast.success(`Congrats, you own Lying Flat #${tokenId}`, {
        toastId: "fill-ask-success",
      });
      setFillAskState(false);
    },
  });

  useEffect(() => {
    if (tokenId) {
      const { askPrice, findersFeeBps } = checkAsk(tokenId);
      setAskPrice(askPrice);
      setFindersFeeBps(findersFeeBps);
    }
    return;
  }, [checkAsk, tokenId]);

  return (
    <>
      <Transition appear show={fillAskState} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-stone-100 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2 flex justify-between items-center ">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold tracking-tight leading-6 text-gray-900"
                    >
                      Buy
                    </Dialog.Title>
                    <div className="flex items-center">
                      <span className="mr-2">Lying flat #{tokenId}</span>
                      <Image
                        src={`https://ipfs.io/ipfs/bafybeicgwytuxvm6p6w6gbigaykwg5xmkwyvbnsx2jq5w7dbvkr4dpvwxy/${tokenId}.jpg`}
                        alt={`${tokenId} image`}
                        width={30}
                        height={30}
                        layout="fixed"
                      />
                    </div>
                  </div>
                  <form
                    action="submit"
                    onSubmit={(e) => handleFillAsk(e)}
                    className="mt-4 flex flex-col justify-center space-y-4"
                  >
                    <div className="flex items-center ">
                      <span>Price</span>
                      <div>
                        <span className="mx-2 font-bold">
                          {ethers.utils.formatEther(askPrice)}
                        </span>
                        <span>ETH</span>
                      </div>
                    </div>
                    {findersFeeBps > 0 && (
                      <div className="flex flex-col">
                        <span className="font-bold">Finder&apos;s Fee.</span>
                        <div className="flex items-center">
                          <span>Someone facilitated this sale?</span>
                          <button
                            className="flex flex-col justify-center items-center ml-2  rounded-full "
                            type="button"
                            onClick={() => setShowFFInput(!showFFInput)}
                          >
                            {showFFInput ? (
                              <MinusCircleIcon className="h-4 w-4" />
                            ) : (
                              <PlusCircleIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                    {showFFInput && (
                      <div className="w-full">
                        <input
                          id="#findersFee"
                          type="text"
                          placeholder="Finder's address ( No .ETH names )"
                          className="p-2 w-full"
                          onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setFindersFeeAddress(e.currentTarget.value)
                          }
                        />
                      </div>
                    )}
                    {findersFeeBps > 0 && showFFInput && (
                      <span className="text-xs underline">
                        <Link
                          href={
                            "https://docs.zora.co/docs/v3-overview#finders-fee"
                          }
                          passHref
                        >
                          <a target="_blank" rel="noopener noreferrer">
                            Learn about Finder&apos;s Fee
                          </a>
                        </Link>
                      </span>
                    )}

                    <button
                      type="submit"
                      disabled={processing}
                      className=" mt-4 inline-flex justify-center border border-transparent bg-stone-800 px-4 py-2 text-sm font-bold text-stone-100 hover:bg-stone-900 focus:outline-none "
                    >
                      {processing ? (
                        <div className="flex justify-between items-center ">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-stone-500"
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
                          <span>PROCESSING...</span>
                        </div>
                      ) : (
                        "BUY"
                      )}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
