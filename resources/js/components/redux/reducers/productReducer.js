const initialState = {
    all_product: [],
    shop_products: [],
    product_recommend: [],
};

const GET_PRODUCT_RECOMMEND = "GET_PRODUCT_RECOMMEND";
const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";
const GET_SHOP_PRODUCT = "GET_SHOP_PRODUCT";

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
        default:
            return state;
    }
};

export default productReducer;
