import MyNFTContractAddress from "../contracts/MyNFT-address.json";

export const getNFTFromUser = async (traderContract, tokenId) => {
    const txn = await traderContract.methods.acquireNFT(MyNFTContractAddress.MyNFT, tokenId).call();
    await txn.wait();
}

export const sellNFTToUser = async (traderContract, tokenId, buyer) => {
    const txn = await traderContract.methods.sellNFT(buyer,
        MyNFTContractAddress.MyNFT,
        tokenId)
    await txn.wait();
}