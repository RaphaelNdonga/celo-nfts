import { useContract } from "./useContract";
import NFTTraderAbi from "../contracts/NFTTrader.json";
import NFTTraderAddress from "../contracts/NFTTrader-address.json";

export const useNFTTraderContract = () =>
    useContract(NFTTraderAbi.abi, NFTTraderAddress.NFTTrader);