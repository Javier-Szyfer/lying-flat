import { useState } from "react";
import Image from "next/image";
import { Fragment, SyntheticEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSigner, useWaitForTransaction } from "wagmi";
import { contractAddress } from "../config/contractAddress";
import { AsksV11__factory } from "@zoralabs/v3/dist/typechain/factories/AsksV11__factory";
import mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/4.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet
import { toast } from "react-toastify";

export default function CancelAskModal({
  cancelAskOpen,
  setCancelAskOpen,
  tokenId,
}) {
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState("");

  const { data: signer } = useSigner();
  // Initialize Asks v1.1 Module Contract
  const askModuleContract = AsksV11__factory.connect(
    mainnetZoraAddresses.AsksV1_1,
    signer
  );
  const handleCancelAsk = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("about to cancel an ask");
    setProcessing(true);
    try {
      const receipt = await askModuleContract.cancelAsk(
        contractAddress,
        tokenId
      );
      {
        receipt?.hash && setHash(receipt.hash);
      }
    } catch (e) {
      setCancelAskOpen(false);
      setProcessing(false);
      toast.error(e.message, {
        toastId: "cancel-ask-error",
      });
    }
  };
  const { data: waitForTransaction } = useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      setProcessing(false);
      toast.success("NFT successfully unlisted", {
        toastId: "cancel-ask-success",
      });
      setCancelAskOpen(false);
    },
  });

  function closeModal() {
    setCancelAskOpen(false);
  }

  return (
    <>
      <Transition appear show={cancelAskOpen} as={Fragment}>
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
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Cancel listing
                    </Dialog.Title>
                    <div className="flex items-center">
                      <span className="mr-2 text-md">
                        Lying flat #{tokenId}
                      </span>
                      <Image
                        src={`https://ipfs.io/ipfs/bafybeicgwytuxvm6p6w6gbigaykwg5xmkwyvbnsx2jq5w7dbvkr4dpvwxy/${tokenId}.jpg`}
                        alt={`${tokenId} image`}
                        width={30}
                        height={30}
                        layout="fixed"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You&apos;re about to cancel the listing of this NFT.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className=" inline-flex justify-center border border-transparent bg-stone-800 px-4 py-2 text-sm font-medium text-stone-100 hover:bg-stone-900 focus:outline-none "
                      onClick={(e) => handleCancelAsk(e)}
                    >
                      {processing ? (
                        <div className="flex justify-between items-center">
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
                        "CONFIRM"
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
