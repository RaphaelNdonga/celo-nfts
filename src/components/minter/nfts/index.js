import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import AddNfts from "./Add";
import Nft from "./Card";
import Loader from "../../ui/Loader";
import { NotificationSuccess, NotificationError } from "../../ui/Notifications";
import {
    getNfts,
    createNft,
    fetchNftContractOwner,
} from "../../../utils/minter";
import { Row } from "react-bootstrap";

const NftList = ({ minterContract, name }) => {
    const { performActions, address } = useContractKit();
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nftOwner, setOwner] = useState(null);

    const getAssets = useCallback(async () => {
        try {
            setLoading(true);
            const allNfts = await getNfts(minterContract);
            if (!allNfts) return;
            setNfts(allNfts);

        } catch (error) {
            console.log("Error while getting assets: ", error)
        } finally {
            setLoading(false)
        }
    }, [minterContract])

    const addNft = async (data) => {
        try {
            setLoading(true);
            await createNft(minterContract, performActions, data);
            toast(<NotificationSuccess text="NFT upload complete" />);
            getAssets();
        } catch (error) {
            toast(<NotificationError text="Failed to create an NFT." />);
            console.log("Error adding nft: ", error);
        } finally {
            setLoading(false);
        }
    }
    const fetchContractOwner = useCallback(async () => {
        const _address = await fetchNftContractOwner(minterContract);
        console.log("_address is ", _address)
        setOwner(_address);
    }, []);

    useEffect(() => {
        try {
            if (address && minterContract) {
                getAssets();
                fetchContractOwner();
            }
        } catch (error) {
            console.log("Error in use effect: ", error)

        }
    }, [minterContract, address, getAssets, fetchContractOwner])
    if (address) {
        console.log("Address is and is loading: ", loading)
        console.log("nftOwner == address", (nftOwner === address))
        console.log("nftowner: ", nftOwner)
        console.log("user: ", address)
        return (
            <>
                {!loading ? (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-4 fw-bold mb-0">{name}</h1>
                            {nftOwner === address ? (
                                <AddNfts save={addNft} address={address} />
                            ) : null}
                        </div>
                        <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                            {nfts.map((_nft) => (
                                <Nft
                                    key={_nft.index}
                                    nft={{
                                        ..._nft,
                                    }}
                                />
                            ))}
                        </Row>
                    </>
                ) : (
                    <Loader />
                )}
            </>
        );
    }
    return null;
};

NftList.propTypes = {
    minterContract: PropTypes.instanceOf(Object),
    updateBalance: PropTypes.func.isRequired,
};

NftList.defaultProps = {
    minterContract: null,
};

export default NftList;