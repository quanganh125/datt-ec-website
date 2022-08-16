import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import "./productManager.scss";
import { fetchShopProduct } from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import Loading from "../../layouts/Loading";
import ProductNotFound from "../../../assets/images/Product Not Found.png";
import { apiHistory, headers } from "../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductManager() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [saleHistory, setSaleHistory] = useState([]);
    const [waiting, setWaiting] = useState([]);
    const [reject, setReject] = useState([]);
    const [confirmed, setConfirmed] = useState([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const fetchShopProducts = () => {
        dispatch(fetchShopProduct());
    };

    useEffect(() => {
        fetchShopProducts();
    }, []);

    const all_shop_product_datas = useSelector(
        (state) => state.product.shop_products
    );

    useEffect(() => {
        if (all_shop_product_datas) {
            dispatch(fetchSaleHistory());
            setIsLoading(true);
        }
    }, [isLoading, all_shop_product_datas]);

    const onClickTab = (event, tabName) => {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(
                " active",
                ""
            );
        }
        document.getElementById(tabName).style.display = "block";
        event.currentTarget.className += " active";

        if (tabName != "product" && !isLoadingHistory) {
            dispatch(fetchSaleHistory());
            setIsLoadingHistory(true);
        }
    };
    const fetchSaleHistory = () => async () => {
        await axios
            .get(`${apiHistory}/sale-history`, { headers: headers })
            .then((res) => {
                const get_shop_product = res.data.data;
                setSaleHistory(get_shop_product);
                setWaiting(
                    get_shop_product.filter(function (el) {
                        return el.order_status == "CONFIRM_WAITING";
                    })
                );
                setReject(
                    get_shop_product.filter(function (el) {
                        return el.order_status == "REJECTED";
                    })
                );
                setConfirmed(
                    get_shop_product.filter(function (el) {
                        return el.order_status == "CONFIRMED";
                    })
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const convertDate = (date) => {
        let d = new Date(date);
        let now = new Date();
        let diff_days = parseInt((now - d) / (1000 * 60 * 60 * 24));
        if (diff_days == 0) return "Today";
        else if (diff_days == 1) return "Yesterday";
        else return diff_days + " days ago";
    };
    const toDetail = (id) => {
        window.location.href = `/product/${id}/detail`;
    };
    const handleAccept = (item) => {
        let filteredArr = waiting.filter((el) => el.id !== item.id);
        setWaiting(filteredArr);
        setConfirmed([...confirmed, item]);
        dispatch(apiAccept(item.id));
    };
    const handleReject = (item) => {
        let filteredArr = waiting.filter((el) => el.id !== item.id);
        setWaiting(filteredArr);
        setReject([...reject, item]);
        dispatch(apiReject(item.id));
    };
    const apiAccept = (id) => async () => {
        await axios
            .get(`${apiHistory}/accept/${id}`, { headers: headers })
            .then((res) => {
                toast.success("注文を受け付けました");
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const apiReject = (id) => async () => {
        console.log(id);
        await axios
            .get(`${apiHistory}/reject/${id}`, { headers: headers })
            .then((res) => {
                toast.success("注文が拒否されました");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div id="productManagerContainer">
            <div className="tab sticky">
                <button
                    className="tablinks active"
                    onClick={(event) => onClickTab(event, "product")}
                >
                    製品管理
                </button>
                <button
                    className="tablinks"
                    onClick={(event) => onClickTab(event, "waiting")}
                >
                    確認待ち
                </button>
                <button
                    className="tablinks"
                    onClick={(event) => onClickTab(event, "reject")}
                >
                    キャンセル
                </button>
                <button
                    className="tablinks"
                    onClick={(event) => onClickTab(event, "history")}
                >
                    販売履歴
                </button>
            </div>

            <div
                id="product"
                className="tabcontent"
                style={{ display: "block" }}
            >
                {isLoading ? (
                    <>
                        <div className="product-handler">
                            <h3>製品管理画面</h3>
                            <div>
                                <Link to="/product/create">
                                    <Button
                                        className="btn-action"
                                        variant="contained"
                                        color="primary"
                                        style={{ marginRight: 30 }}
                                    >
                                        <i className="fas fa-plus-circle icon-btn"></i>
                                        新しい商品を追加
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {all_shop_product_datas.length > 0 && (
                            <div className="product-list">
                                <Pagination
                                    dataItems={all_shop_product_datas}
                                    itemsPerPage={8}
                                    type={"manager-product"}
                                />
                            </div>
                        )}
                        {!all_shop_product_datas.length && (
                            <div className="nonProduct">
                                <img
                                    src={ProductNotFound}
                                    alt="product not found"
                                    className="product-not-found"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </div>

            <div id="waiting" className="tabcontent">
                {isLoadingHistory ? (
                    <>
                        <h3>
                            <b>確認待ち</b>
                        </h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">商品名</th>
                                    <th scope="col">数量</th>
                                    <th scope="col">価格</th>
                                    <th scope="col">時間</th>
                                    <th scope="col">配送先住所</th>
                                    <th scope="col">顧客</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {waiting &&
                                    waiting.map((data, index) => (
                                        <tr
                                            key={index}
                                            className="item-history"
                                        >
                                            <td
                                                data-label="商品名"
                                                onClick={() =>
                                                    toDetail(data.product_id)
                                                }
                                            >
                                                {data.product_name}
                                            </td>
                                            <td data-label="数量">
                                                {data.quantity}
                                            </td>
                                            <td
                                                data-label="価格"
                                                style={{ color: "blue" }}
                                            >
                                                {data.price_at_purchase_time}円
                                            </td>
                                            <td data-label="時間">
                                                {convertDate(data.created_at)}
                                            </td>
                                            <td
                                                data-label="顧客"
                                                style={{ overflow: "auto" }}
                                            >
                                                {data.delivery_address}
                                            </td>
                                            <td
                                                data-label="顧客"
                                                style={{ overflow: "auto" }}
                                            >
                                                {data.customer_name}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-success"
                                                    onClick={() =>
                                                        handleAccept(data)
                                                    }
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        handleReject(data)
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {waiting.length == 0 && (
                            <div className="nonHistory">
                                <img
                                    src={ProductNotFound}
                                    alt="product not found"
                                    className="product-not-found"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </div>

            <div id="reject" className="tabcontent">
                {isLoadingHistory ? (
                    <>
                        <h3>
                            <b>キャンセル</b>
                        </h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">商品名</th>
                                    <th scope="col">数量</th>
                                    <th scope="col">価格</th>
                                    <th scope="col">時間</th>
                                    <th scope="col">配送先住所</th>
                                    <th scope="col">顧客</th>
                                    <th scope="col">状態</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reject &&
                                    reject.map((data, index) => (
                                        <tr
                                            key={index}
                                            onClick={() =>
                                                toDetail(data.product_id)
                                            }
                                            className="item-history"
                                        >
                                            <td data-label="商品名">
                                                {data.product_name}
                                            </td>
                                            <td data-label="数量">
                                                {data.quantity}
                                            </td>
                                            <td
                                                data-label="価格"
                                                style={{ color: "blue" }}
                                            >
                                                {data.price_at_purchase_time}円
                                            </td>
                                            <td data-label="時間">
                                                {convertDate(data.created_at)}
                                            </td>
                                            <td
                                                data-label="顧客"
                                                style={{ overflow: "auto" }}
                                            >
                                                {data.delivery_address}
                                            </td>
                                            <td
                                                data-label="顧客"
                                                style={{ overflow: "auto" }}
                                            >
                                                {data.customer_name}
                                            </td>
                                            <td className="alert alert-danger">
                                                Rejected
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {reject.length == 0 && (
                            <div className="nonHistory">
                                <img
                                    src={ProductNotFound}
                                    alt="product not found"
                                    className="product-not-found"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </div>

            <div id="history" className="tabcontent">
                {isLoadingHistory ? (
                    <>
                        <h3>
                            <b>販売履歴</b>
                        </h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">商品名</th>
                                    <th scope="col">数量</th>
                                    <th scope="col">価格</th>
                                    <th scope="col">時間</th>
                                    <th scope="col">配送先住所</th>
                                    <th scope="col">顧客</th>
                                    <th scope="col">状態</th>
                                </tr>
                            </thead>
                            <tbody>
                                {confirmed &&
                                    confirmed.map((data, index) => (
                                        <tr
                                            key={index}
                                            onClick={() =>
                                                toDetail(data.product_id)
                                            }
                                            className="item-history"
                                        >
                                            <td data-label="商品名">
                                                {data.product_name}
                                            </td>
                                            <td data-label="数量">
                                                {data.quantity}
                                            </td>
                                            <td
                                                data-label="価格"
                                                style={{ color: "blue" }}
                                            >
                                                {data.price_at_purchase_time}円
                                            </td>
                                            <td data-label="時間">
                                                {convertDate(data.created_at)}
                                            </td>
                                            <td
                                                data-label="顧客"
                                                style={{ overflow: "auto" }}
                                            >
                                                {data.delivery_address}
                                            </td>
                                            <td
                                                data-label="顧客"
                                                style={{ overflow: "auto" }}
                                            >
                                                {data.customer_name}
                                            </td>
                                            <td className="alert alert-success">
                                                Success
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {confirmed.length == 0 && (
                            <div className="nonHistory">
                                <img
                                    src={ProductNotFound}
                                    alt="product not found"
                                    className="product-not-found"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}
