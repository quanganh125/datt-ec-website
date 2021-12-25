import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Item from "./ProductItem";
import "./productList.scss";
import { apiGetShop, headers } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductFavorite } from "../../redux/actions/productActions";

function ProductList({ currentItems, type }) {
    const [userIdShop, setUserIdShop] = useState(null);
    const loginState = useSelector((state) => state.user.loginState);
    const dispatch = useDispatch();

    const fetchFavoriteProducts = () => {
        dispatch(fetchProductFavorite());
    };

    useEffect(() => {
        loginState && fetchFavoriteProducts();
        return () => {};
    }, []);

    const all_favorite_product_datas = useSelector(
        (state) => state.product.products_favortite
    );

    const fetchUserShopId = async () => {
        try {
            await axios
                .get(`${apiGetShop}`, {
                    headers: headers,
                })
                .then((res) => {
                    const currentShopId = res.data; //shop cua nguoi dung dang xem san pham
                    setUserIdShop(currentShopId);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {}
    };

    useEffect(() => {
        loginState && fetchUserShopId();
        return () => {
            setUserIdShop(null);
        };
    }, []);

    const checkFavorite = (product_id) => {
        let check = false;
        for (var i = 0; i < all_favorite_product_datas.length; i++) {
            if (all_favorite_product_datas[i].product_id == product_id) {
                check = true;
                break;
            }
        }
        return check;
    };

    return (
        <div className="listContainer">
            <Grid container alignItems="stretch" spacing={2}>
                {currentItems &&
                    currentItems.map((data) => (
                        <Grid
                            key={data.id}
                            item
                            xs={12}
                            sm={6}
                            md={type == "home" ? 3 : 6}
                        >
                            <Item
                                data={data}
                                userIdShop={userIdShop}
                                loginState={loginState}
                                favoriteState={checkFavorite(data.id)}
                            />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}
export default React.memo(ProductList);
