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
    const [favorite, setFavorite] = useState(false);
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
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

    useEffect(() => {
        return () => {};
    }, [favorite]);

    return (
        <div className="itemContainer">
            <div className="itemHeader">
                <img src={image_url} alt="productImg" className="itemImg" />
                <i
                    className="fas fa-heart favorite-heart"
                    onClick={() => toggleFavorite()}
                    style={{ color: favorite ? "grey" : "red" }}
                ></i>
            </div>
            <div className="itemContent" onClick={() => goToDetail()}>
                <h6>{data.name}</h6>
                <p className="item-value">
                    <span>1000円</span>
                </p>
                <p>
                    <span
                        style={{
                            textDecoration: "line-through",
                            color: "grey",
                        }}
                    >
                        {data.price}円
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{}}>-30%</span>
                </p>
                <StarRatings
                    rating={caculatorAvgRate(data.reviews)}
                    starDimension="20px"
                    starSpacing="0"
                    starRatedColor="#fcec00"
                />
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
