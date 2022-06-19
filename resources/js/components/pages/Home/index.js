import React, { useEffect, useState } from "react";
import "./home.scss";
import {
    fetchProductRecommend,
    fetchBestSale,
    fetchBestSaleCategory,
} from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { paginate_count } from "../../constant";
import Pagination from "../../layouts/Pagination";
import Loading from "../../layouts/Loading";
import SideBar from "../../layouts/SideBar";
import { Link } from "react-router-dom";
import ProductNotFound from "../../../assets/images/Product Not Found.png";
import banner1 from "../../../assets/images/homeBanner1.png";
import banner2 from "../../../assets/images/homeBanner2.png";
import banner3 from "../../../assets/images/homeBanner3.png";
import saleIcon from "../../../assets/images/Super Sale Vector PNG.png";

export default function Home() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [filterData, setFilterData] = useState("");
    const product_recommend_datas = useSelector(
        (state) => state.product.product_recommend
    );

    const best_sale_category = useSelector(
        (state) => state.product.best_sale_category
    );

    const best_sale_datas = useSelector((state) => state.product.best_sale);

    const searchTitle = useSelector((state) => state.search.search_title);

    const recommendByUserHistory = product_recommend_datas.filter(function (
        el
    ) {
        return el.category_id == best_sale_category;
    });

    const fetchBestSaleCategoryHome = () => {
        dispatch(fetchBestSaleCategory());
    };

    const fetchProduct = () => {
        dispatch(fetchProductRecommend());
    };

    const fetchBestSaleProduct = () => {
        dispatch(fetchBestSale());
    };

    useEffect(() => {
        fetchBestSaleCategoryHome();
        fetchProduct();
        fetchBestSaleProduct();
    }, []);

    useEffect(() => {
        if (product_recommend_datas) {
            setDisplayProducts(product_recommend_datas);
            setIsLoading(true);
        }
        return () => {
            setIsLoading(null);
        };
    }, [isLoading, product_recommend_datas]);

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
            <div id="demo" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide-to="0"
                        className="active"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide-to="1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide-to="2"
                    ></button>
                </div>
                <Link to="/event">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src={banner1}
                                alt="Los Angeles"
                                className="d-block image-banner"
                            />
                            <div className="carousel-caption title-carousel">
                                <h3 style={{ color: "white" }}>
                                    多くの魅力的なオファーで新年あけましておめでとうございます
                                </h3>
                                <h5 style={{ color: "white" }}>
                                    0円からのご注文で全国送料無料
                                </h5>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={banner2}
                                alt="Chicago"
                                className="d-block image-banner"
                            />
                            <div className="carousel-caption title-carousel">
                                <h3 style={{ color: "white" }}>
                                    ゴールデンアワー
                                </h3>
                                <h5 style={{ color: "white" }}>
                                    時間枠には多くの安い製品があります
                                </h5>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={banner3}
                                alt="New York"
                                className="d-block image-banner"
                            />
                            <div className="carousel-caption title-carousel">
                                <h3 style={{ color: "white" }}>
                                    見逃せない情報
                                </h3>
                                <h5 style={{ color: "white" }}>
                                    具体的には、衝撃的な割引プログラム
                                </h5>
                            </div>
                        </div>
                    </div>
                </Link>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#demo"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#demo"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            {isLoading ? (
                <>
                    <div className="tab sticky">
                        <button
                            className="tablinks active"
                            onClick={(event) => onClickTab(event, "all")}
                        >
                            全て
                        </button>
                        {best_sale_category && (
                            <button
                                className="tablinks"
                                onClick={(event) =>
                                    onClickTab(event, "recommend")
                                }
                            >
                                レコメンデーション
                            </button>
                        )}
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

                    {best_sale_category && (
                        <div id="recommend" className="tabcontent">
                            <Pagination
                                dataItems={recommendByUserHistory}
                                itemsPerPage={paginate_count}
                                type={"home-product"}
                            />
                        </div>
                    )}

                    <div id="selling" className="tabcontent">
                        <Pagination
                            dataItems={best_sale_datas}
                            itemsPerPage={paginate_count}
                            type={"home-product"}
                        />
                        {!best_sale_datas.length && (
                            <div className="nonProduct">
                                <img
                                    src={ProductNotFound}
                                    alt="product not found"
                                    className="product-not-found"
                                />
                            </div>
                        )}
                    </div>

                    <Link to="/event">
                        <div className="event">
                            <img
                                src={saleIcon}
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
