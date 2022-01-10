import React, { useEffect, useState } from "react";
import "./history.scss";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../layouts/Loading";
import { fetchProductHistory } from "../../redux/actions/productActions";

export default function Favorite() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
        }
    }, [isLoading, all_history_product_datas]);

    const toDetail = (id) => {
        window.location.href = `/product/${id}/detail`;
    };

    const convertDate = (date) => {
        let d = new Date(date);
        return d.toLocaleString("en-US");
    };

    return (
        <div id="historyContainer">
            {isLoading ? (
                <>
                    <h3>
                        <b>購入履歴</b>
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">商品名</th>
                                <th scope="col">カテゴリー</th>
                                <th scope="col">数量</th>
                                <th scope="col">価格</th>
                                <th scope="col">時間</th>
                            </tr>
                        </thead>
                        <tbody>
                            {all_history_product_datas &&
                                all_history_product_datas.map((data, index) => (
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
                                        <td data-label="価格">
                                            {data.price_at_purchase_time}円
                                        </td>
                                        <td data-label="時間">
                                            {convertDate(data.created_at)}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="continue-buy">
                        <a href="/home">
                            <b>ショッピングを続ける...</b>
                        </a>
                    </div>
                    {all_history_product_datas.length == 0 && (
                        <div className="nonHistory">
                            <div>
                                <h3>購入履歴がありません</h3>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
