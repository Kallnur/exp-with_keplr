import { AccountData, makeSignDoc } from "@cosmjs/amino";
import { SigningCosmosClient } from "@cosmjs/launchpad";
import { Account } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";

export const getKeplr = async (): Promise<Keplr | undefined> => {
    if (window.keplr) {
        return window.keplr;
    }

    if (document.readyState === "complete") {
        return window.keplr;
    }

    return new Promise((resolve) => {
        const documentStateChange = (event: Event) => {
            if (
                event.target &&
                (event.target as Document).readyState === "complete"
            ) {
                resolve(window.keplr);
                document.removeEventListener("readystatechange", documentStateChange);
            }
        };

        document.addEventListener("readystatechange", documentStateChange);
    });
}

export const getData = async (COSMOS_ID: string) => {
    const keplr = getKeplr();
    return keplr.then(async (keplr) => {
        await keplr?.enable(COSMOS_ID);
        const offlineSigner = keplr?.getOfflineSigner(COSMOS_ID);
        const accounts: readonly AccountData[] | undefined = await offlineSigner?.getAccounts(); 

        const cosmJS = new SigningCosmosClient(
            "https://lcd-cosmoshub.keplr.app",
            accounts![0].address,
            offlineSigner!
        );

        return keplr
    })
    // .then(({keplr, cosmJS}) => {
    //     const userInfo = keplr?.getKey(COSMOS_ID)
    //     return 
    // })
}