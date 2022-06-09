import { Fragment, useState } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet
import { IERC721__factory } from "@zoralabs/v3/dist/typechain/factories/IERC721__factory";
import { IERC20__factory } from "@zoralabs/v3/dist/typechain/factories/IERC20__factory";
import { ZoraModuleManager__factory } from "@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory";
import { contractAddress } from "../config/contractAddress";
import { useSigner, useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";

export default function ApproveMarketplaceDialog({ isOpen, setIsOpen }) {
  const [approving, setApproving] = useState(false);
  const [hash, setHash] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const { data: signer } = useSigner();
  const { data: account } = useAccount({
    suspense: true,
  });

  // Initialize NFT Lying Flat Rinkeby contract and ERC20 contract
  const erc721Contract = IERC721__factory.connect(contractAddress, signer);
  const erc20Contract = IERC20__factory.connect(contractAddress, signer);
  // Initialize Zora V3 Module Manager contract
  const moduleManagerContract = ZoraModuleManager__factory.connect(
    mainnetZoraAddresses.ZoraModuleManager,
    signer
  );
  //TransferHelpers must be aproved to transfer NFTs
  const erc721TransferHelperAddress = mainnetZoraAddresses.ERC721TransferHelper;

  const handleApprovals = async () => {
    setApproving(true);
    const approved = await erc721Contract.isApprovedForAll(
      account.address, // NFT owner address
      erc721TransferHelperAddress // V3 Module Transfer Helper to approve
    );
    if (!approved) {
      try {
        await erc721Contract
          .setApprovalForAll(
            erc721TransferHelperAddress, // V3 Module Transfer Helper to approve
            true
          )
          .then(() => approveModules());
      } catch (e) {
        setApproving(false);
        toast.error(e.message, {
          toastId: "approve-marketplace-error",
        });
        closeModal();
      }
    } else approveModules();
  };

  const approveModules = async () => {
    // Approving Asks v1.1
    const approved = await moduleManagerContract.isModuleApproved(
      account.address,
      mainnetZoraAddresses.AsksV1_1
    );
    if (approved === false) {
      try {
        const receipt = await moduleManagerContract.setApprovalForModule(
          mainnetZoraAddresses.AsksV1_1,
          true
        );

        {
          receipt && receipt.hash && setHash(receipt.hash);
        }
      } catch (e) {
        setApproving(false);
        toast.error(e.message, {
          toastId: "approve-modules-error",
        });
      }
    }
  };

  const { data: waitForTransaction } = useWaitForTransaction({
    hash: hash,
    confirmations: 2,
    onSuccess(data) {
      setApproving(false);
      toast.success("Zora Modules approved", {
        toastId: "zora-modules-success",
      });
      closeModal();
    },
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Approve Zora Modules
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Laying Flat marketplace is built on the{" "}
                      <Link href={"https://docs.zora.co/"} passHref>
                        <a
                          target="_blank"
                          rel="noopener no refferer"
                          className="text-gray-900 underline"
                        >
                          Zora Protocol.
                        </a>
                      </Link>
                      <br />
                      <br />
                      Please sign the following approvals to allow the protocol
                      to interact with your assets. <br /> <br /> You will see
                      this prompt only once.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center w-full  ">
                    <button
                      type="button"
                      className=" mr-2 inline-flex justify-center  border border-transparent bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-300 focus:outline-none focus-visible:ring-2 "
                      onClick={closeModal}
                    >
                      BACK
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center  border border-transparent bg-stone-800 px-4 py-2 text-sm font-medium text-stone-100 hover:bg-stone-900 focus:outline-none focus-visible:ring-2 "
                      onClick={() => handleApprovals()}
                    >
                      {approving ? (
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
                          <span>APPROVING...</span>
                        </div>
                      ) : (
                        "LETS GO"
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
