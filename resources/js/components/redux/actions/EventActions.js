import axios from "axios";
import { apiEvent, apiCoupon } from "../../constant";

const GET_EVENT = "GET_EVENT";
const GET_COUPON_EVENT = "GET_COUPON_EVENT";

export const fetchEvent = (id) => async (dispatch) => {
    await axios
        .get(`${apiEvent}/${id}`)
        .then((res) => {
            const eventData = res.data.data;
            dispatch({
                type: GET_EVENT,
                payload: eventData,
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

export const fetchAllCouponEvent = (id) => async (dispatch) => {
    await axios
        .get(`${apiCoupon}/event/${id}`)
        .then((res) => {
            const couponData = res.data.data;
            dispatch({
                type: GET_COUPON_EVENT,
                payload: couponData,
            });
        })
        .catch((error) => {
            console.error(error);
        });
};
