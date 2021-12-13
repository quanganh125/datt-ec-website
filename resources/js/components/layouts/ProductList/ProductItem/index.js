import React, { useState, useEffect } from "react";
import "./productItem.scss";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { apiStorage } from "../../../constant";
import storage from "../../../services/firebaseConfig";

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
    const [image_url, setImage_url] = useState("");
    const history = useHistory();

    useEffect(() => {
        getLinkImage(data.image_link);
        setLinkDetail(`/product/${data.id}/detail`);
        return () => {
            setLinkDetail("");
            setImage_url("");
        };
    }, [linkDetail]);

    const goToDetail = () => {
        window.location.href = linkDetail;
    };

    const getLinkImage = (name) => {
        storage
            .ref("product_img")
            .child(name)
            .getDownloadURL()
            .then((url) => {
                setImage_url(url);
            });
    };

    return (
        <div className="itemContainer" onClick={() => goToDetail()}>
            <div className="itemHeader">
                <img src={image_url} alt="productImg" className="itemImg" />
            </div>
            <div className="itemContent">
                <h6>{data.name}</h6>
                <p className="item-value">価格: {data.price}円</p>
                <StarRatings
                    rating={caculatorAvgRate(data.reviews)}
                    starDimension="20px"
                    starSpacing="0"
                    starRatedColor="#fcec00"
                />
                <p className="item-review">
                    レビュー数: {data.reviews.length}回
                </p>
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
