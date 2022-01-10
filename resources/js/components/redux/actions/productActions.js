import axios from "axios";
import { setCookie, getCookie } from "../../utils/cookie";
import { toast } from "react-toastify";
import { apiFavorite, apiProduct, apiHistory } from "../../constant";

const GET_PRODUCT_RECOMMEND = "GET_PRODUCT_RECOMMEND";
const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const GET_SHOP_PRODUCT = "GET_SHOP_PRODUCT";
const GET_PRODUCT_RECOMMEND_DETAIL = "GET_PRODUCT_RECOMMEND_DETAIL";
const GET_PRODUCTS_FAVORITE = "GET_PRODUCTS_FAVORITE";
const GET_PRODUCTS_HISTORY = "GET_PRODUCTS_HISTORY";

export const headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${getCookie("access_token")}`,
};
export const deleteProduct = (id) => async (dispatch) => {
    await axios
        .post(`${apiProduct}/${id}/delete`)
        .then((res) => {
            toast.success("製品を正常に削除する!");
            dispatch(fetchShopProduct());
            dispatch(fetchAllProduct());
        })
        .catch((error) => {
            toast.error("失敗した製品の削除!");
            console.error(error);
        });
};

export const fetchAllProduct = () => async (dispatch) => {
    await axios
        .get(apiProduct, { headers: headers })
        .then((res) => {
            const get_all_product = res.data.data;
            dispatch(setAllProduct(get_all_product));
        })
        .catch((error) => {
            console.error(error);
            dispatch(setAllProduct(null));
        });
};

export const setAllProduct = (products) => {
    return { type: GET_ALL_PRODUCT, payload: products };
};

export const fetchShopProduct = () => async (dispatch) => {
    await axios
        .get(`${apiProduct}/shop`, { headers: headers })
        .then((res) => {
            const get_shop_product = res.data.data;
            dispatch(setShopProduct(get_shop_product));
        })
        .catch((error) => {
            console.error(error);
            dispatch(setShopProduct(null));
        });
};

export const setShopProduct = (products) => {
    return { type: GET_SHOP_PRODUCT, payload: products };
};

export const fetchProductRecommend = () => async (dispatch) => {
    await axios
        .get(`${apiProduct}/recommend`, { headers: headers })
        .then((res) => {
            const get_product_recommend = res.data.data;
            dispatch(setProductRecommend(get_product_recommend));
        })
        .catch((error) => {
            console.error(error);
            dispatch(setProductRecommend(null));
        });
};

export const fetchProductFavorite = () => async (dispatch) => {
    await axios
        .get(`${apiFavorite}/user`, { headers: headers })
        .then((res) => {
            const products_favortite = res.data.data;
            dispatch({
                type: GET_PRODUCTS_FAVORITE,
                payload: products_favortite,
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

export const fetchProductHistory = () => async (dispatch) => {
    await axios
        .get(`${apiHistory}/user`, { headers: headers })
        .then((res) => {
            const products_history = res.data.data;
            dispatch({
                type: GET_PRODUCTS_HISTORY,
                payload: products_history,
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

export const setProductRecommend = (products) => {
    return { type: GET_PRODUCT_RECOMMEND, payload: products };
};

export const getProductRecommendDetail =
    (id, category_id) => async (dispatch) => {
        await axios
            .get(`${apiProduct}/recommend`, { headers: headers })
            .then((res) => {
                const get_product_recommend = res.data.data;
                var get_product_recommend_detail = [];
                if (get_product_recommend.length > 2) {
                    for (let i = 0; i < get_product_recommend.length; i++) {
                        if (
                            get_product_recommend[i].id != id &&
                            get_product_recommend[i].category_id ==
                                category_id &&
                            get_product_recommend_detail.length < 2
                        ) {
                            get_product_recommend_detail.push(
                                get_product_recommend[i]
                            );
                        }
                    }
                } else {
                    for (let i = 0; i < get_product_recommend.length; i++) {
                        if (get_product_recommend[i].id != id) {
                            get_product_recommend_detail.push(
                                get_product_recommend[i]
                            );
                        }
                    }
                }
                dispatch({
                    type: GET_PRODUCT_RECOMMEND_DETAIL,
                    payload: get_product_recommend_detail,
                });
            })
            .catch((error) => {
                console.error(error);
                dispatch({
                    type: GET_PRODUCT_RECOMMEND_DETAIL,
                    payload: [],
                });
            });
    };
