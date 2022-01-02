import { getCookie } from "../utils/cookie";
export const api = "http://127.0.0.1:8000";
export const apiCategory = `${api}/api/category`;
export const apiLogout = `${api}/api/auth/logout`;
export const apiReview = `${api}/api/review`;
export const apiProduct = `${api}/api/product`;
export const apiAuthLogin = `${api}/api/auth/login`;
export const apiAuthRegister = `${api}/api/auth/register`;
export const apiAuthUserProfile = `${api}/api/auth/user-profile`;
export const apiShop = `${api}/api/shop`;
export const apiStorage = `${api}/api/storage`;
export const apiGetShop = `${api}/api/shop/user`;
export const apiFavorite = `${api}/api/favorite`;
export const apiHistory = `${api}/api/history`;
export const apiEvent = `${api}/api/event`;
export const apiCoupon = `${api}/api/coupon`;
export const paginate_count = 8;
export const headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${getCookie("access_token")}`,
};
