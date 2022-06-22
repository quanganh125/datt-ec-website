import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import "./productManager.scss";
import { fetchShopProduct } from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import Loading from "../../layouts/Loading";
import ProductNotFound from "../../../assets/images/Product Not Found.png";

export default function ProductManager() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const fetchShopProducts = () => {
        dispatch(fetchShopProduct());
    };

    useEffect(() => {
        fetchShopProducts();
    }, []);

    const all_shop_product_datas = useSelector(
        (state) => state.product.shop_products
    );

    useEffect(() => {
        if (all_shop_product_datas) {
            setIsLoading(true);
        }
    }, [isLoading, all_shop_product_datas]);

    return (
        <div id="productManagerContainer">
            {isLoading ? (
                <>
                    <div className="product-handler">
                        <h3>プロダクト管理画面</h3>
                        <div>
                            <Link to="/product/create">
                                <Button
                                    className="btn-action"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginRight: 30 }}
                                >
                                    <i className="fas fa-plus-circle icon-btn"></i>
                                    新しい商品を追加
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {all_shop_product_datas.length > 0 && (
                        <div className="product-list">
                            <Pagination
                                dataItems={all_shop_product_datas}
                                itemsPerPage={8}
                                type={"manager-product"}
                            />
                        </div>
                    )}
                    {!all_shop_product_datas.length && (
                        <div className="nonProduct">
                            <img
                                src={ProductNotFound}
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
