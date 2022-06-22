import React, { useState, useEffect } from "react";
import "./navigation.scss";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import Logo from "../../../assets/images/default_logo.png";
import Search from "./Search";
import axios from "axios";
import { apiLogout } from "../../constant";
import {
    deleteAllCookies,
    deleteCookie,
    getCookie,
} from "./../../utils/cookie";
import { fetchShopId, setShopId } from "./../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { apiGetShop } from "./../../constant/index";

var lastScrollTop = 0;

function Navigation({ userProfile, loginState, isShowSearch }) {
    const [click, setClick] = useState(false);
    const [shopId, setshopId] = useState(null);
    const [shopLink, setShopLink] = useState("");
    const closeMobileMenu = () => setClick(false);
    const dispatch = useDispatch();
    const [isScroll, setIsScroll] = useState({
        onTop: false,
    });

    const handleClickMobile = () => setClick(!click);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.onscroll = () => {
                let currentScrollPos = window.pageYOffset;
                if (
                    currentScrollPos > lastScrollTop &&
                    currentScrollPos > 130
                ) {
                    setIsScroll({ onTop: true });
                } else {
                    setIsScroll({ onTop: false });
                }
                lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
            };
        }
    }, [isScroll]);

    const logout = async () => {
        if (getCookie("access_token") != "") {
            const headers = {
                "Content-type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            };
            try {
                await axios
                    .post(apiLogout, { data: "mydata" }, { headers: headers })
                    .then((res) => {
                        toast.success("サインアウトに成功しました!");
                        deleteCookie("access_token");
                        // deleteAllCookies();
                        setTimeout(() => {
                            window.location.href = `/home`;
                        }, 500);
                    });
            } catch (error) {
                deleteCookie("access_token");
                return { statusCode: 500, body: error.toString() };
            }
        } else {
            window.location.href = `/home`;
        }
    };
    const fetchShopId = async () => {
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        userProfile.id &&
            (await axios
                .get(`${apiGetShop}`, {
                    headers: headers,
                })
                .then((res) => {
                    const id = res.data;
                    setshopId(id);
                    setShopLink(`/store/${shopId}`);
                    dispatch(setShopId(id));
                })
                .catch((error) => {
                    console.error(error);
                }));
    };

    useEffect(() => {
        fetchShopId();
    }, [userProfile, shopId]);

    return (
        <div
            id="nav"
            style={{
                height: 130,
                top: isScroll.onTop ? -140 : 0,
            }}
        >
            <div className="header">
                <div className="logo-nav">
                    <div className="logo-container">
                        <a
                            href="/home"
                            title="Trang chu"
                            style={{
                                padding: 0,
                                backgroundColor: "transparent",
                            }}
                        >
                            <img
                                id="logopersonal"
                                alt="logo"
                                src={Logo}
                                height="50"
                            />
                        </a>
                        <ul
                            className={
                                click ? "nav-options active" : "nav-options"
                            }
                            style={{ marginBottom: 0 }}
                        >
                            {loginState ? (
                                <>
                                    {shopId ? (
                                        <>
                                            <li className="option">
                                                <a
                                                    href={shopLink}
                                                    className="underline"
                                                >
                                                    ストアのプロフィール
                                                </a>
                                            </li>
                                            <li className="option">
                                                <a
                                                    href="/product/manager"
                                                    className="underline"
                                                >
                                                    製品管理
                                                </a>
                                            </li>
                                        </>
                                    ) : (
                                        <li className="option">
                                            <a
                                                href="/store/create"
                                                className="underline"
                                            >
                                                ストアを作成
                                            </a>
                                        </li>
                                    )}
                                    <li className="option">
                                        <a
                                            href="/history"
                                            className="underline"
                                        >
                                            購入履歴
                                        </a>
                                    </li>
                                    <li className="option">
                                        <a
                                            href="/favorite"
                                            className="underline"
                                        >
                                            ウィッシュリスト
                                        </a>
                                    </li>
                                    {click ? (
                                        <li className="option">
                                            <a
                                                className="underline"
                                                onClick={() => logout()}
                                            >
                                                サインアウト
                                            </a>
                                        </li>
                                    ) : null}
                                </>
                            ) : (
                                <>
                                    <li
                                        className="option mobile-option"
                                        onClick={closeMobileMenu}
                                    >
                                        <a href="/login" className="underline">
                                            ログイン
                                        </a>
                                    </li>
                                    <li
                                        className="option mobile-option"
                                        onClick={closeMobileMenu}
                                    >
                                        <a
                                            href="/register"
                                            className="underline"
                                        >
                                            サインアップ
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="mobile-menu" onClick={handleClickMobile}>
                    {click ? (
                        <i className="fas fa-times fa-2x menu-icon"></i>
                    ) : (
                        <i className="fas fa-bars fa-2x menu-icon"></i>
                    )}
                </div>
                {!loginState ? (
                    <ul className="signin-up" style={{ marginBottom: 0 }}>
                        <li className="sign-in" onClick={closeMobileMenu}>
                            <a href="/login">
                                <i className="fas fa-sign-in-alt icon-btn"></i>
                                ログイン
                            </a>
                        </li>
                        <li className="signup-btn" onClick={closeMobileMenu}>
                            <a href="/register">サインアップ</a>
                        </li>
                    </ul>
                ) : (
                    <ul className="signin-up" style={{ marginBottom: 0 }}>
                        <li className="sign-in" style={{ color: "white" }}>
                            <p style={{ width: "fit-content" }}>
                                Hello、{userProfile.name}
                            </p>
                        </li>
                        <li className="signup-btn" onClick={closeMobileMenu}>
                            <a onClick={() => logout()}>サインアウト</a>
                        </li>
                    </ul>
                )}
            </div>
            {isShowSearch ? (
                <div className="bottomNav">
                    <Grid container>
                        <Grid item xs={12} className="searchContainer">
                            <Search />
                        </Grid>
                    </Grid>
                </div>
            ) : null}
        </div>
    );
}

export default Navigation;
