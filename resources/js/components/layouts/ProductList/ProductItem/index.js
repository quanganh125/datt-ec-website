import React, { useState, useEffect } from "react";
import "./productItem.scss";
import { Button } from "@material-ui/core";
import StarRatings from "react-star-ratings";
import { apiStorage } from "../../../constant";
import storage from "../../../services/firebaseConfig";
import { toast } from "react-toastify";
import saleIcon from "../../../../assets/images/sale.png";
import { format } from "../../../utils/common";
import { apiFavorite } from "../../../constant";
import axios from "axios";
import {
    fetchProductFavorite,
    headers,
} from "./../../../redux/actions/productActions";
import { useDispatch } from "react-redux";

export default function Item({ data, userIdShop, loginState, favoriteState }) {
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
    const dispatch = useDispatch();

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
        dispatch(fetchProductFavorite());
        setFavorite(!favorite);
    };

    useEffect(() => {
        setFavorite(favoriteState || false);
        return () => {
            setLinkDetail("");
            setImage_url("");
            setFavorite(false);
        };
    }, []);

    const getPriceSale = (price, discount) => {
        return Math.round(discount ? price - (price * discount) / 100 : price);
    };

    //kiem tra shop cua nguoi dung co trung shop cua san pham hay khong
    const checkShop = () => {
        if (userIdShop == "" || userIdShop != data.shop_id) return true;
        return false;
    };

    return (
        <div className="itemContainer">
            <div className="itemHeader">
                <img src={image_url} alt="productImg" className="itemImg" />
                {loginState && checkShop() && (
                    <i
                        className="fas fa-heart favorite-heart"
                        onClick={(event) => toggleFavorite(event)}
                        style={{ color: favorite ? "red" : "grey" }}
                    ></i>
                )}
                {data.discount && (
                    <img src={saleIcon} alt="sale-icon" className="sale-icon" />
                )}
            </div>
            <div className="itemContent" onClick={() => goToDetail()}>
                <h5>{data.name}</h5>
                <p className="item-value">
                    <span>
                        {getPriceSale(data.price, data.discount) > 0
                            ? `${format(
                                  getPriceSale(data.price, data.discount)
                              )}円`
                            : "無料"}
                    </span>
                </p>
                <p>
                    <>
                        <span
                            style={{
                                textDecoration: "line-through",
                                color: "grey",
                            }}
                        >
                            {data.discount ? (
                                <b>{format(data.price)}円</b>
                            ) : null}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                            {data.discount ? (
                                <b>
                                    <i className="fas fa-arrow-down"></i>
                                    {data.discount}%
                                </b>
                            ) : null}
                        </span>
                    </>
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
