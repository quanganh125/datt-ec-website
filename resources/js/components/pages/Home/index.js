import React, { useEffect, useState } from "react";
import { Button, DatePicker, version } from "antd";
import { Link } from "react-router-dom";
import "./home.scss";
import ProductList from "../../layouts/ProductList";
import imgTest1 from "../../../assets/images/google.png";
import { fetchProductRecommend } from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { api, paginate_count } from "../../constant";

export default function Home() {
    const dispatch = useDispatch();
    const [pageCount, setPageCount] = useState(0);

    const fetchProduct = (page = 1) => {
        dispatch(fetchProductRecommend(page));
    };

    useEffect(() => {
        fetchProduct();
        getPageCount();
    }, []);

    const getPageCount = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/product/count`)
            .then((res) => {
                setPageCount(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const product_recommend_datas = useSelector(
        (state) => state.product.product_recommend
    );

    return (
        <div id="homeContainer">
            <h3>
                <b>レコメンデーション</b>
            </h3>
            <ProductList dataList={product_recommend_datas} />
            <div className="paginate">
                <Pagination
                    activePage={0}
                    itemsCountPerPage={paginate_count}
                    totalItemsCount={pageCount}
                    onChange={(pageNumber) => {
                        fetchProduct(pageNumber);
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>
        </div>
    );
}
