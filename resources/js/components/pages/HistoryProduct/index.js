import React, { useEffect, useState } from "react";
import "./history.scss";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../layouts/Loading";
import { fetchProductHistory } from "../../redux/actions/productActions";
import ProductNotFound from "../../../assets/images/Product Not Found.png";
import axios from "axios";
import { toast } from "react-toastify";

export default function Favorite() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [waiting, setWaiting] = useState([]);
    const [reject, setReject] = useState([]);
    const [confirmed, setConfirmed] = useState([]);

    const fetchHistoryProducts = () => {
        dispatch(fetchProductHistory());
    };

    useEffect(() => {
        fetchHistoryProducts();
        return () => {
            setIsLoading(false);
        };
    }, []);

    const all_history_product_datas = useSelector(
        (state) => state.product.products_history
    );

    useEffect(() => {
        if (all_history_product_datas) {
            setWaiting(
                all_history_product_datas.filter(function (el) {
                    return el.order_status == "CONFIRM_WAITING";
                })
            );
            setReject(
                all_history_product_datas.filter(function (el) {
                    return el.order_status == "REJECTED";
                })
            );
            setConfirmed(
                all_history_product_datas.filter(function (el) {
                    return el.order_status == "CONFIRMED";
                })
            );
            setIsLoading(true);
        }
    }, [isLoading, all_history_product_datas]);

    const toDetail = (id) => {
        window.location.href = `/product/${id}/detail`;
    };

    const convertDate = (date) => {
        let d = new Date(date);
        let now = new Date();
        let diff_days = parseInt((now - d) / (1000 * 60 * 60 * 24));
        if (diff_days == 0) return "Today";
        else if (diff_days == 1) return "Yesterday";
        else return diff_days + " days ago";
    };

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
    };

    const handleReject = (item) => {
        let filteredArr = waiting.filter((el) => el.id !== item.id);
        setWaiting(filteredArr);
        setReject([...reject, item]);
        dispatch(apiReject(item.id));
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
        <div id="historyContainer">
            {isLoading ? (
                <>
                    <h3>
                        <b>購入履歴</b>
                    </h3>

                    <div className="tab sticky">
                        <button
                            className="tablinks active"
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
                            onClick={(event) => onClickTab(event, "confirmed")}
                        >
                            確認された
                        </button>
                    </div>

                    <div
                        id="waiting"
                        className="tabcontent"
                        style={{ display: "block" }}
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">商品名</th>
                                    <th scope="col">カテゴリー</th>
                                    <th scope="col">数量</th>
                                    <th scope="col">価格</th>
                                    <th scope="col">配送先住所</th>
                                    <th scope="col">時間</th>
                                    <th scope="col">注文状況</th>
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
                                            <td data-label="カテゴリー">
                                                {data.category}
                                            </td>
                                            <td data-label="数量">
                                                {data.quantity}
                                            </td>
                                            <td
                                                data-label="価格"
                                                style={{ color: "blue" }}
                                            >
                                                {data.price_at_purchase_time}
                                            </td>
                                            <td data-label="配送先住所">
                                                {data.delivery_address}
                                            </td>
                                            <td data-label="時間">
                                                {convertDate(data.created_at)}
                                            </td>
                                            <td
                                                data-label="注文状況"
                                                className="alert alert-warning"
                                            >
                                                Waiting for confirmation
                                            </td>
                                            <td>
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
                    </div>
                    <div id="reject" className="tabcontent">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">商品名</th>
                                    <th scope="col">カテゴリー</th>
                                    <th scope="col">数量</th>
                                    <th scope="col">価格</th>
                                    <th scope="col">配送先住所</th>
                                    <th scope="col">時間</th>
                                    <th scope="col">注文状況</th>
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
                                            <td data-label="カテゴリー">
                                                {data.category}
                                            </td>
                                            <td data-label="数量">
                                                {data.quantity}
                                            </td>
                                            <td
                                                data-label="価格"
                                                style={{ color: "blue" }}
                                            >
                                                {data.price_at_purchase_time}
                                            </td>
                                            <td data-label="配送先住所">
                                                {data.delivery_address}
                                            </td>
                                            <td data-label="時間">
                                                {convertDate(data.created_at)}
                                            </td>
                                            <td
                                                data-label="注文状況"
                                                className="alert alert-danger"
                                            >
                                                Rejected
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div id="confirmed" className="tabcontent">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">商品名</th>
                                    <th scope="col">カテゴリー</th>
                                    <th scope="col">数量</th>
                                    <th scope="col">価格</th>
                                    <th scope="col">配送先住所</th>
                                    <th scope="col">時間</th>
                                    <th scope="col">注文状況</th>
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
                                            <td data-label="カテゴリー">
                                                {data.category}
                                            </td>
                                            <td data-label="数量">
                                                {data.quantity}
                                            </td>
                                            <td
                                                data-label="価格"
                                                style={{ color: "blue" }}
                                            >
                                                {data.price_at_purchase_time}
                                            </td>
                                            <td data-label="配送先住所">
                                                {data.delivery_address}
                                            </td>
                                            <td data-label="時間">
                                                {convertDate(data.created_at)}
                                            </td>
                                            <td
                                                data-label="注文状況"
                                                className="alert alert-success"
                                            >
                                                Success
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="continue-buy">
                        <a href="/home">
                            <b>ショッピングを続ける...</b>
                        </a>
                    </div>
                    {all_history_product_datas.length == 0 && (
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
    );
}
