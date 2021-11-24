import React, { useState, useEffect } from "react";
import "./productItem.scss";
import { Button } from "@material-ui/core";
import Logo from "../../../../assets/images/facebook.png";
import Rate from "./../../Rate";
import { useHistory } from "react-router-dom";

export default function Item({ data }) {
    const caculatorAvgRate = (reviews) => {
        return 4;
    };
    const [linkDetail, setLinkDetail] = useState("");
    const history = useHistory();

    useEffect(() => {
        setLinkDetail(`/product/${data.id}/detail`);
    }, [linkDetail]);

    const goToDetail = () => {
        history.push(linkDetail);
    };

    return (
        <div className="itemContainer">
            <div className="itemHeader">
                <img
                    src={data.image_link}
                    alt="productImg"
                    className="itemImg"
                />
            </div>
            <div className="itemContent">
                <h6>{data.name}</h6>
                <p className="item-value">価格: {data.price}円</p>
                <Rate
                    numberVoted={caculatorAvgRate([])}
                    size={15}
                    choice={data.vote}
                />
                <div className="item-create-location">
                    <span className="item-location">{data.location}</span>
                </div>
            </div>
            <div className="itemDrop-btn">
                <Button className="item-btn-care" onClick={() => goToDetail()}>
                    詳細
                </Button>
            </div>
        </div>
    );
}
