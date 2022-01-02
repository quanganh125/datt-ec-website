const initialState = {
    eventData: {},
    couponData: [],
};

const GET_EVENT = "GET_EVENT";
const GET_COUPON_EVENT = "GET_COUPON_EVENT";

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENT:
            return {
                ...state,
                eventData: action.payload,
            };
        case GET_COUPON_EVENT:
            return {
                ...state,
                couponData: action.payload,
            };
        default:
            return state;
    }
};

export default eventReducer;
