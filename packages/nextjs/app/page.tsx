"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useSmartAccount } from "~~/hooks/burnerWallet/useSmartAccount";
import { useSmartTransactor } from "~~/hooks/burnerWallet/useSmartTransactor";

const Home: NextPage = () => {
  console.log("page.tsx loaded...");
  const { scaAddress, scaSigner } = useSmartAccount();
  const transactor = useSmartTransactor();
  const [isTxnLoading, setIsTxnLoading] = useState(false);

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
            <Address address={scaAddress} />
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
      </div>
    </>
  );
};

export default Home;
