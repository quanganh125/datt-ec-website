import React, { useEffect, useState } from "react";
import "./favorite.scss";
import { paginate_count } from "../../constant";
import Pagination from "../../layouts/Pagination";
import Loading from "../../layouts/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductFavorite } from "../../redux/actions/productActions";
import ProductNotFound from "../../../assets/images/Product Not Found.png";

export default function History() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const fetchFavoriteProducts = () => {
        dispatch(fetchProductFavorite());
    };

    useEffect(() => {
        fetchFavoriteProducts();
        return () => {};
    }, []);

    const all_favorite_product_datas = useSelector(
        (state) => state.product.products_favortite
    );

    useEffect(() => {
        if (all_favorite_product_datas) {
            setIsLoading(true);
        }
    }, [isLoading, all_favorite_product_datas]);

    return (
        <div id="favoriteContainer">
            {isLoading ? (
                <>
                    <h3>
                        <b>ウィッシュリスト</b>
                    </h3>
                    {all_favorite_product_datas.length > 0 && (
                        <Pagination
                            dataItems={all_favorite_product_datas}
                            itemsPerPage={paginate_count}
                            type={"history-product"}
                        />
                    )}
                    {!all_favorite_product_datas.length && (
                        <>
                            <div className="continue-buy">
                                <a href="/home">
                                    <b>ショッピングを続ける...</b>
                                </a>
                            </div>
                            <div className="nonProduct">
                                <img
                                    src={ProductNotFound}
                                    alt="product not found"
                                    className="product-not-found"
                                />
                            </div>
                        </>
                    )}
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
