import React, { useState, useEffect } from "react";
import "./productItem.scss";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { apiStorage } from "../../../constant";
import storage from "../../../services/firebaseConfig";
import { toast } from "react-toastify";
import saleIcon from "../../../../assets/images/sale.png";
import { format } from "../../../utils/common";
import { apiFavorite } from "../../../constant";
import axios from "axios";
import { headers } from "./../../../redux/actions/productActions";

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

    const toggleFavorite = async (event) => {
        event.preventDefault();
        const dataFavorite = {
            product_id: data.id,
        };
        if (favorite) {
            try {
                await axios
                    .delete(`${apiFavorite}/${data.id}`, dataFavorite, {
                        headers: headers,
                    })
                    .then((response) => {
                        toast.success("ウィッシュリストから削除されました");
                    });
            } catch (error) {
                return { statusCode: 500, body: error.toString() };
            }
        } else {
            try {
                await axios
                    .post(apiFavorite, dataFavorite, {
                        headers: headers,
                    })
                    .then((response) => {
                        toast.success("ウィッシュリストに追加されました");
                    });
            } catch (error) {
                return { statusCode: 500, body: error.toString() };
            }
        }
        setFavorite(!favorite);
    };

    const checkFavorite = () => {};

    useEffect(() => {
        checkFavorite();
        return () => {};
    }, [favorite]);

    const getPriceSale = (price, discount) => {
        return Math.round(discount ? price - (price * discount) / 100 : price);
    };

    return (
        <div className="itemContainer">
            <div className="itemHeader">
                <img src={image_url} alt="productImg" className="itemImg" />
                <i
                    className="fas fa-heart favorite-heart"
                    onClick={(event) => toggleFavorite(event)}
                    style={{ color: favorite ? "red" : "grey" }}
                ></i>
                {data.discount && (
                    <img src={saleIcon} alt="sale-icon" className="sale-icon" />
                )}
            </div>
            <div className="itemContent" onClick={() => goToDetail()}>
                <h6>{data.name}</h6>
                <p className="item-value">
                    <span>
                        {getPriceSale(data.price, data.discount) > 0
                            ? `${format(
                                  getPriceSale(data.price, data.discount)
                              )}円`
                            : "無料"}
                    </span>
                </p>
                {data.discount ? (
                    <p>
                        <span
                            style={{
                                textDecoration: "line-through",
                                color: "grey",
                            }}
                        >
                            <b>{format(data.price)}円</b>
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                            <b>
                                <i className="fas fa-arrow-down"></i>
                                {data.discount}%
                            </b>
                        </span>
                    </p>
                ) : null}
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
