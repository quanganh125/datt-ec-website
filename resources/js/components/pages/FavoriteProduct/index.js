import React, { useEffect, useState } from "react";
import "./favorite.scss";
import ProductList from "../../layouts/ProductList";
import { fetchProductRecommend } from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { apiProduct, paginate_count } from "../../constant";
import Pagination from "../../layouts/Pagination";
import Loading from "../../layouts/Loading";

export default function Home() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div id="favoriteContainer">
            {isLoading ? (
                <>
                    <h3>
                        <b>ウィッシュリスト</b>
                    </h3>
                    <Pagination
                        dataItems={null}
                        itemsPerPage={8}
                        type={"favorite-product"}
                    />
                    {isLoading && (
                        <div className="nonProduct">
                            <img
                                src="https://www.polonomicho.com/images/no-product.png"
                                alt="product not found"
                                className="product-not-found"
                            />
                        </div>
                    )}
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
