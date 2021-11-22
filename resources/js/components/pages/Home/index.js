import React, { useEffect, useState } from "react";
import { Button, DatePicker, version } from "antd";
import { Link } from "react-router-dom";
import "./home.scss";
import ProductList from "../../layouts/ProductList";
import imgTest1 from "../../../assets/images/google.png";
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
