import { assertIsBroadcastTxSuccess } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplr } from "./start";

export const sendCosmos = async (COSMOS_ID: string, address: FormDataEntryValue, amount: FormDataEntryValue) => {
    const keplr = getKeplr();

    keplr.then(async (keplr) => {

        const offlineSigner = keplr?.getOfflineSigner(COSMOS_ID);
        const accounts = await offlineSigner?.getAccounts();
        console.log(offlineSigner);
        
        const client = await SigningStargateClient.connectWithSigner("", offlineSigner!)

        const chaines = await keplr?.getChainInfosWithoutEndpoints();
        const cosmosDenom = chaines![0].stakeCurrency.coinMinimalDenom;

        const amountFinal = {
            denom: cosmosDenom,
            amount: amount?.toString(),
        }
        const fee = {
            amount: [{
                denom: cosmosDenom,
                amount: amount?.toString(),
            }, ],
            gas: '20',
        }

        const result = await client.sendTokens(accounts![0].address, address.toString(), [amountFinal], fee, "")
        assertIsBroadcastTxSuccess(result)
        console.log(result);
        
        if (result.code !== undefined && result.code !== 0) {
            alert("Failed to send tx: " + result.logs || result.rawLog);
        } else {
            alert("Succeed to send tx:" + result.transactionHash);
        }
    })
}