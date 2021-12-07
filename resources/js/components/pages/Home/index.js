import React, { useEffect, useState } from "react";
import "./home.scss";
import ProductList from "../../layouts/ProductList";
import { fetchProductRecommend } from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { apiProduct, paginate_count } from "../../constant";
import Pagination from "../../layouts/Pagination";
import Loading from "../../layouts/Loading";

export default function Home() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const fetchProduct = () => {
        dispatch(fetchProductRecommend());
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const product_recommend_datas = useSelector(
        (state) => state.product.product_recommend
    );

    useEffect(() => {
        if (product_recommend_datas) {
            setIsLoading(true);
        }
    }, [isLoading, product_recommend_datas]);

    const searchTitle = useSelector((state) => state.search.search_title);

    const getSearchResult = () => {
        if (searchTitle == "") return product_recommend_datas;
        else
            return product_recommend_datas.filter(function (el) {
                return el.name
                    .toLowerCase()
                    .includes(searchTitle.toLowerCase());
            });
    };

    return (
        <div id="homeContainer">
            {isLoading ? (
                <>
                    <h3>
                        <b>レコメンデーション</b>
                    </h3>
                    <Pagination
                        dataItems={getSearchResult()}
                        itemsPerPage={8}
                        type={"home-product"}
                    />
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
