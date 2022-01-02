import React, { useEffect, useState } from "react";
import "./home.scss";
import ProductList from "../../layouts/ProductList";
import { fetchProductRecommend } from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { apiProduct, paginate_count } from "../../constant";
import Pagination from "../../layouts/Pagination";
import Loading from "../../layouts/Loading";
import SideBar from "../../layouts/SideBar";
import { Link } from "react-router-dom";
import { set } from "lodash";
import ProductNotFound from "../../../assets/images/Product Not Found.png";

export default function Home() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [filterData, setFilterData] = useState("");

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
            setDisplayProducts(product_recommend_datas);
            setIsLoading(true);
        }
        return () => {
            setIsLoading(null);
        };
    }, [isLoading, product_recommend_datas]);

    const searchTitle = useSelector((state) => state.search.search_title);

    useEffect(() => {
        getSearchResult();
    }, [searchTitle]);

    const getSearchResult = () => {
        if (isFilter) {
            if (searchTitle == "") {
                filterByFilterData(filterData);
            } else {
                setDisplayProducts(
                    displayProducts.filter(function (el) {
                        return el.name
                            .toLowerCase()
                            .includes(searchTitle.toLowerCase());
                    })
                );
            }
        } else {
            if (searchTitle == "") {
                setDisplayProducts(product_recommend_datas);
            } else {
                setDisplayProducts(
                    product_recommend_datas.filter(function (el) {
                        return el.name
                            .toLowerCase()
                            .includes(searchTitle.toLowerCase());
                    })
                );
            }
        }
    };

    const isFilterDiscount = (el, is_discount_selected) => {
        if (is_discount_selected == "") return true;
        else if (el.discount > 0) return true;
        else return false;
    };

    const isFilterCategory = (el, category_id) => {
        if (category_id == "") return true;
        else if (el.category_id == category_id) return true;
        else return false;
    };

    const isFilterMinPrice = (el, min_price) => {
        if (min_price == "") return true;
        else if ((el.price * (100 - el.discount)) / 100 >= min_price)
            return true;
        else return false;
    };

    const isFilterMaxPrice = (el, max_price) => {
        if (max_price == "") return true;
        else if ((el.price * (100 - el.discount)) / 100 <= max_price)
            return true;
        else return false;
    };

    const filterByFilterData = (filterData) => {
        setDisplayProducts(
            product_recommend_datas
                .filter(function (el) {
                    return (
                        isFilterMaxPrice(el, filterData.max_price) &&
                        isFilterMinPrice(el, filterData.min_price) &&
                        isFilterCategory(el, filterData.category) &&
                        isFilterDiscount(el, filterData.is_discount_selected)
                    );
                })
                .sort(function (a, b) {
                    switch (filterData.sort_option) {
                        case "1":
                            var a_last_price =
                                (a.price * (100 - a.discount)) / 100;
                            var b_last_price =
                                (b.price * (100 - b.discount)) / 100;
                            return a_last_price < b_last_price
                                ? 1
                                : b_last_price < a_last_price
                                ? -1
                                : 0;
                            break;
                        case "2":
                            var a_last_price =
                                (a.price * (100 - a.discount)) / 100;
                            var b_last_price =
                                (b.price * (100 - b.discount)) / 100;
                            return a_last_price > b_last_price
                                ? 1
                                : b_last_price > a_last_price
                                ? -1
                                : 0;
                            break;
                        case "4":
                            return a.created_at < b.created_at
                                ? 1
                                : b.created_at < a.created_at
                                ? -1
                                : 0;
                            break;
                        default:
                            return a.recommend_mark < b.recommend_mark
                                ? 1
                                : b.recommend_mark < a.recommend_mark
                                ? -1
                                : 0;
                    }
                })
        );
    };

    const handleFilterSubmit = (filterData) => {
        setIsFilter(true);
        setFilterData(filterData);
        filterByFilterData(filterData);
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

    return (
        <div id="homeContainer">
            <div className="top-banner">
                <img
                    src="https://icms-image.slatic.net/images/ims-web/6a239f08-db37-457f-bc7a-8129ea7f9967.jpg"
                    alt="top-event"
                    className="image-banner"
                />
            </div>
            {isLoading ? (
                <>
                    <div className="tab">
                        <button
                            className="tablinks active"
                            onClick={(event) => onClickTab(event, "all")}
                        >
                            全て
                        </button>
                        <button
                            className="tablinks"
                            onClick={(event) => onClickTab(event, "recommend")}
                        >
                            レコメンデーション
                        </button>
                        <button
                            className="tablinks"
                            onClick={(event) => onClickTab(event, "selling")}
                        >
                            ベストセラー
                        </button>
                    </div>

                    <div
                        id="all"
                        className="tabcontent"
                        style={{ display: "block" }}
                    >
                        <SideBar onFilterSubmit={handleFilterSubmit} />
                        <Pagination
                            dataItems={displayProducts}
                            itemsPerPage={paginate_count}
                            type={"home-product"}
                        />
                        {!product_recommend_datas.length && (
                            <div className="nonProduct">
                                <img
                                    src={ProductNotFound}
                                    alt="product not found"
                                    className="product-not-found"
                                />
                            </div>
                        )}
                    </div>

                    <div id="recommend" className="tabcontent"></div>

                    <div id="selling" className="tabcontent"></div>

                    <Link to="/event">
                        <div className="event">
                            <img
                                src="https://cf.shopee.vn/file/d61120acdb4a7e883f6f9adf1e1f50fd"
                                alt="event"
                                width={80}
                                height={80}
                            />
                        </div>
                    </Link>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
