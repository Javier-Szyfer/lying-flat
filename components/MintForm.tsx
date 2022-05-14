import { useState } from "react";
import Link from "next/link";
import {
  useBalance,
  useAccount,
  useContractWrite,
  useContractRead,
  useSignMessage,
  useWaitForTransaction,
  useProvider,
} from "wagmi";
import { ethers } from "ethers";
import { contractAddress } from "../config/contractAddress";
import { LyingFlatABI } from "../config/LyingFlatABI";
import { formatHash } from "../utils/address";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MintForm = () => {
  const [amount, setAmount] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [showTXHash, setShowTXHash] = useState(false);
  const options = { value: ethers.utils.parseEther((amount * 0.1).toString()) };

  const provider = useProvider();
  const { data: account } = useAccount({
    suspense: true,
  });

  const { data: balance } = useBalance({
    addressOrName: account?.address,
  });

  const { data: mintData, writeAsync } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: LyingFlatABI,
      signerOrProvider: provider,
    },
    "mint",
    {
      args: [amount, options],
    }
  );

  const { data: waitForTransaction } = useWaitForTransaction({
    hash: mintData?.hash,
    wait: mintData?.wait,
    onSuccess(data) {
      showSuccess(data);
      setShowTXHash(true);
    },
  });

  console.log(waitForTransaction);
  const showSuccess = (data: any) => {
    toast.success(`Minted ${amount} tokens!`, {
      toastId: "$sdfg9024",
    });
    setProcessing(false);
  };

  const { data: readTokenAmount } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: LyingFlatABI,
    },
    "balanceOf",
    {
      args: account?.address,
    }
  );
  const { signMessageAsync } = useSignMessage({
    message: `Your'e about to mint ${amount} tokens!`,
  });

  const firstChecks = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setProcessing(true);
    if (balance?.formatted <= (amount * 0.01).toString()) {
      setProcessing(false);
      toast.error("Not enough funds :(", {
        toastId: "adfadfadf",
      });
      return;
    } else if (readTokenAmount.toNumber() + amount > 2) {
      setProcessing(false);
      toast.error("Max minting per wallet is 2", {
        toastId: "5sgg4gsy345",
      });
      return;
    }
    mintFunc();
  };

  const mintFunc = async () => {
    setProcessing(true);
    try {
      await signMessageAsync();
    } catch (e) {
      toast.error("Signing rejected!", { toastId: "5sgg4g343ssdfgsy345" });
      setProcessing(false);
      return;
    }
    try {
      await writeAsync();
    } catch (e) {
      setProcessing(false);
      toast.error("Transaction rejected!", { toastId: "5sgg4g343ssdfgsy345" });
      return;
    }
  };

  return (
    <>
      <form onSubmit={firstChecks}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          theme="dark"
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <div className="flex  justify-center space-x-2 ">
          <div className="flex items-center justify-center border-2 border-stone-800 text-center cursor-pointer ">
            <div
              className={`${
                amount === 1 ? "bg-stone-300 " : "bg-transparent "
              } py-1 px-2  text-center border-r-2 border-stone-800  `}
              onClick={() => setAmount(1)}
            >
              1
            </div>

            <div
              onClick={() => setAmount(2)}
              className={`${
                amount === 2 ? "bg-stone-300 " : "bg-transparent "
              } py-1 px-2  text-center  `}
            >
              2
            </div>
          </div>
          <button
            type="submit"
            disabled={processing || !account}
            className="py-1 px-4  border-2 border-stone-800 text-center disabled:opacity-80 disabled:cursor-not-allowed hover:bg-zinc-300"
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
                <span>Processing</span>{" "}
              </div>
            ) : (
              `MINT ${amount * 0.1} Ξ`
            )}
          </button>
        </div>
        {showTXHash && (
          <Link
            href={`https://rinkeby.etherscan.io/tx/${waitForTransaction?.transactionHash}`}
            passHref
          >
            <a target="_blank" rel="noopener noreferrer">
              <div className="relative flex flex-col font-bold text-sm  justify-center items-center px-2 py-1 bg-green-400 text-green-900 text-center border-2 border-green-600 mt-4 max-w-48 overflow-hidden">
                {/* <button
                  className="absolute right-4 top-1 text-lg font-bold"
                  onClick={() => setShowTXHash(false)}
                >
                  x
                </button> */}
                <span>
                  SEE YOUR TX ON ETHERSCAN, <br /> YOU SHALL RECEIVE YOUR NFT
                  PRETTY SOON
                </span>
                <span>{formatHash(waitForTransaction?.transactionHash)}</span>
              </div>
            </a>
          </Link>
        )}
      </form>
    </>
  );
};

export default MintForm;
