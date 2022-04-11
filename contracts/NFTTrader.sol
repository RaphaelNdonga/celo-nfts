// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTTrader is ERC721Holder {
    constructor() {}

    modifier purchaseNFT(uint256 price) {
        require(
            msg.sender.balance > price,
            "Insufficient funds to purchase NFT"
        );
        payable(msg.sender).transfer(price);
        _;
    }

    function sellNFT(
        address _buyer,
        uint256 _price,
        address _token,
        uint256 _tokenId
    ) public purchaseNFT(_price) {
        IERC721(_token).safeTransferFrom(address(this), _buyer, _tokenId);
    }

    function acquireNFT(address _token, uint256 _tokenId) public {
        IERC721(_token).safeTransferFrom(msg.sender, address(this), _tokenId);
    }
}
