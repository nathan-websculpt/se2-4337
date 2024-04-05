//looking at: https://github.com/technophile-04/smart-wallet/blob/main/packages/nextjs/hooks/burnerWallet/useSmartAccount.ts
import { useEffect, useMemo, useState } from "react";
import { loadBurnerSK } from "../scaffold-eth";
import { useTargetNetwork } from "../scaffold-eth/useTargetNetwork";
import scaffoldConfig from "~~/scaffold.config";
import { createMultiOwnerModularAccount } from "@alchemy/aa-accounts/dist/types/src";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";

const burnerPK = loadBurnerSK();
const burnerSigner = LocalAccountSigner.privateKeyToAccountSigner(burnerPK);

export const useSmartAccount = () => {
  const [scaAddress, setScaAddress] = useState<Address>();
  const [scaSigner, setScaSigner] = useState<AlchemyProvider>();
  const { targetNetwork: chain } = useTargetNetwork();
  const provider = useMemo(
    () =>
      createModularAccountAlchemyClient({
        chain: chain,
        apiKey: scaffoldConfig.alchemyApiKey,
        signer: burnerSigner,
        // opts: {
        //   txMaxRetries: 20,
        //   txRetryIntervalMs: 2_000,
        //   txRetryMulitplier: 1.2,
        // },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chain.id],
  );

  const getMultAcct = async () => {
    const thisMultAcct = await createMultiOwnerModularAccount({
      transport: provider,
      chain,
      signer: scaAddress,
      gasManagerConfig: {
        policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID,
      },
    });
    return thisMultAcct;
  };
  const smartAccountClient = createSmartAccountClient({
    transport: provider,
    chain,
    account: getMultAcct(),
  });

  useEffect(() => {
    console.log("smartAccountClient: ", smartAccountClient);
    // const connectedProvider = provider.connect(provider => {
    // return createMultiOwnerMSCA({
    //   rpcClient: provider,
    //   owner: burnerSigner,
    //   chain,
    //   entryPointAddress: getDefaultEntryPointAddress(chain),
    //   factoryAddress: getDefaultLightAccountFactoryAddress(chain),
    //   signer: scaAddress,
    //   gasManagerConfig: {
    //     policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID,
    //   },
    // });
    // });
    const getScaAddress = async () => {
      const address = await connectedProvider.getAddress();
      console.log("🔥 scaAddress", address);
      setScaAddress(address);
    };
    setScaSigner(connectedProvider);
    getScaAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain.id]);

  return { provider, scaSigner, scaAddress };
};
