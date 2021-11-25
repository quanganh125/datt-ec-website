import React, { useEffect } from "react";
import "./home.scss";
import ProductList from "../../layouts/ProductList";
import { fetchProductRecommend } from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
    const dispatch = useDispatch();
    const fetchProduct = () => {
        dispatch(fetchProductRecommend());
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const product_recommend_datas = useSelector(
        (state) => state.product.product_recommend
    );

    return (
        <div id="homeContainer">
            <h3>レコメンデーション</h3>
            <ProductList dataList={product_recommend_datas} />
        </div>
    );
}
