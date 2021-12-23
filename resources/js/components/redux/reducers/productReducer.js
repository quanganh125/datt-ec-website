const initialState = {
    all_product: [],
    shop_products: [],
    product_recommend: [],
    product_recommend_detail: [],
    products_favortite: [],
    products_history: [],
};

const GET_PRODUCT_RECOMMEND = "GET_PRODUCT_RECOMMEND";
const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";
const GET_SHOP_PRODUCT = "GET_SHOP_PRODUCT";
const GET_PRODUCT_RECOMMEND_DETAIL = "GET_PRODUCT_RECOMMEND_DETAIL";
const GET_PRODUCTS_FAVORITE = "GET_PRODUCTS_FAVORITE";
const GET_PRODUCTS_HISTORY = "GET_PRODUCTS_HISTORY";

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                all_product: action.payload,
            };
        case GET_SHOP_PRODUCT:
            return {
                ...state,
                shop_products: action.payload,
            };
        case GET_PRODUCT_RECOMMEND:
            return {
                ...state,
                product_recommend: action.payload,
            };
        case GET_PRODUCT_RECOMMEND_DETAIL:
            return {
                ...state,
                product_recommend_detail: action.payload,
            };
        case GET_PRODUCTS_FAVORITE:
            return {
                ...state,
                products_favortite: action.payload,
            };
        case GET_PRODUCTS_HISTORY:
            return {
                ...state,
                products_history: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;
