import React, { useEffect, useState } from "react";
import "./home.scss";
import ProductList from "../../layouts/ProductList";
import { fetchProductRecommend } from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { apiProduct, paginate_count } from "../../constant";

export default function Home() {
    const dispatch = useDispatch();
    const [pageCount, setPageCount] = useState(0);

    const fetchProduct = () => {
        dispatch(fetchProductRecommend());
    };

    useEffect(() => {
        fetchProduct();
        getPageCount();
    }, []);

    const getPageCount = async () => {
        await axios
            .get(`${apiProduct}/count`)
            .then((res) => {
                setPageCount(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const product_recommend_datas = useSelector(
        (state) => state.product.product_recommend
    );

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
            <h3>
                <b>レコメンデーション</b>
            </h3>
            <ProductList dataList={getSearchResult()} />
        </div>
    );
}
