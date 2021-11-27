import React, { useEffect, useState } from "react";
import "./home.scss";
import ProductList from "../../layouts/ProductList";
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
            .get(`${api}api/product/count`)
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
            <div className="paginate">
                <Pagination
                    activePage={0}
                    itemsCountPerPage={paginate_count}
                    totalItemsCount={pageCount}
                    onChange={(pageNumber) => {
                        fetchProduct(pageNumber);
                    }}
                    pageRangeDisplayed={4}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </div>
        </div>
    );
}
