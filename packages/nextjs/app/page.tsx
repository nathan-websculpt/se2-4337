//used as reference: https://github.com/technophile-04/smart-wallet/blob/main/packages/nextjs/pages/index.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { encodeFunctionData, parseEther } from "viem";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useSmartAccount } from "~~/hooks/burnerWallet/useSmartAccount";
import { useSmartTransactor } from "~~/hooks/burnerWallet/useSmartTransactor";
import { notification } from "~~/utils/scaffold-eth";

const Home: NextPage = () => {
  //scaSigner is <AlchemyProvider>
  const { scaAddress, scaSigner } = useSmartAccount();
  const [etherInput, setEtherInput] = useState("0.001");
  const [txtInput, setTxtInput] = useState("this is a test");
  const transactor = useSmartTransactor();
  const [isTxnLoading, setIsTxnLoading] = useState(false);

  const uoSimpleCallData = encodeFunctionData({
    abi: [
      {
        inputs: [],
        name: "tst",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "tst",
    //nonce: 4,
  });

  const uoCallDataWithArgs = encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "txt",
            type: "string",
          },
        ],
        name: "tst2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "tst2",
    args: [txtInput],
  });

  const uoCallDataForPayable = encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "_newGreeting",
            type: "string",
          },
        ],
        name: "setGreeting",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "setGreeting",
    args: [txtInput],
  });

  const handleSimpleCall = async () => {
    if (!scaSigner) {
      notification.error("Cannot access smart account");
      return;
    }
    setIsTxnLoading(true);
    try {
      const userOperationPromise = scaSigner.sendUserOperation({
        target: "0xa1781259161F5D7F5FC7FA4aA625ff74C090E91e",
        data: uoSimpleCallData,
      });

      await transactor(() => userOperationPromise);
    } catch (e) {
      notification.error("Oops, something went wrong");
      console.error("Error sending transaction: ", e);
    } finally {
      setIsTxnLoading(false);
    }
  };

  const handleCallWithArgs = async () => {
    if (!scaSigner) {
      notification.error("Cannot access smart account");
      return;
    }
    setIsTxnLoading(true);
    try {
      const userOperationPromise = scaSigner.sendUserOperation({
        target: "0xa1781259161F5D7F5FC7FA4aA625ff74C090E91e",
        data: uoCallDataWithArgs,
      });

      await transactor(() => userOperationPromise);
    } catch (e) {
      notification.error("Oops, something went wrong");
      console.error("Error sending transaction: ", e);
    } finally {
      setIsTxnLoading(false);
    }
  };

  const handlePayableCall = async () => {
    if (!scaSigner) {
      notification.error("Cannot access smart account");
      return;
    }
    setIsTxnLoading(true);
    try {
      const userOperationPromise = scaSigner.sendUserOperation({
        value: parseEther(etherInput),
        target: "0xa1781259161F5D7F5FC7FA4aA625ff74C090E91e",
        data: uoCallDataForPayable,
      });

      await transactor(() => userOperationPromise);
    } catch (e) {
      notification.error("Oops, something went wrong");
      console.error("Error sending transaction: ", e);
    } finally {
      setIsTxnLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block mb-2 text-2xl">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            {scaAddress ? (
              <>
                <Address address={scaAddress} />
              </>
            ) : (
              <></>
            )}
          </div>
          <p className="text-lg text-center">
            Get started by editing{" "}
            <code className="inline-block max-w-full text-base italic font-bold break-words break-all bg-base-300">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-lg text-center">
            Edit your smart contract{" "}
            <code className="inline-block max-w-full text-base italic font-bold break-words break-all bg-base-300">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="inline-block max-w-full text-base italic font-bold break-words break-all bg-base-300">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow w-full px-8 py-12 mt-16 bg-base-300">
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row">
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <BugAntIcon className="w-8 h-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <MagnifyingGlassIcon className="w-8 h-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>

        {/* just testing */}
        <div className="flex-grow w-full px-8 py-12 mt-16 bg-base-300">
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row">
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <button
                className="btn btn-primary rounded-xl"
                disabled={!scaAddress || isTxnLoading}
                onClick={handleSimpleCall}
              >
                {isTxnLoading ? <span className="loading loading-spinner"></span> : "Simple Call"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow w-full px-8 py-12 mt-16 bg-base-300">
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row">
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <button
                className="btn btn-primary rounded-xl"
                disabled={!scaAddress || isTxnLoading}
                onClick={handleCallWithArgs}
              >
                {isTxnLoading ? <span className="loading loading-spinner"></span> : "Call with Args"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow w-full px-8 py-12 mt-16 bg-base-300">
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row">
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <button
                className="btn btn-primary rounded-xl"
                disabled={!scaAddress || isTxnLoading}
                onClick={handlePayableCall}
              >
                {isTxnLoading ? <span className="loading loading-spinner"></span> : "Payable Call"}
              </button>
            </div>
          </div>
        </div>
        {/* END: just testing */}
      </div>
    </>
  );
};

export default Home;
