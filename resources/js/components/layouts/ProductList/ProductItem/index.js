import React, { useState, useEffect } from "react";
import "./productItem.scss";
import { Button } from "@material-ui/core";
import Rate from "./../../Rate";
import { useHistory } from "react-router-dom";

export default function Item({ data }) {
    const caculatorAvgRate = (reviews) => {
        if (reviews.length == 0) return 0;
        let sum = 0;
        reviews.forEach((element) => {
            sum += element.rating;
        });
        var avg = sum / reviews.length;
        return parseFloat(avg.toFixed(1));
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
        <div className="itemContainer" onClick={() => goToDetail()}>
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
                    numberVoted={caculatorAvgRate(data.reviews)}
                    size={15}
                    choice={data.vote}
                />
                <div className="item-create-location">
                    <span className="item-location">{data.location}</span>
                </div>
            </div>
            <div className="itemDrop-btn">
                <Button
                    className="item-btn-detail"
                    onClick={() => goToDetail()}
                >
                    詳細
                </Button>
            </div>
        </div>
    );
}
