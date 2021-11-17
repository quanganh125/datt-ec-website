import React, { useState, useEffect } from "react";
import "./navigation.scss";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import Logo from "../../../assets/images/facebook.png";
import Search from "./Search";
import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { deleteCookie } from "./../../utils/cookie";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

var lastScrollTop = 0;

const apiLogout = "http://127.0.0.1:8000/api/auth/logout";

export default function Navigation({ auth }) {
    const [click, setClick] = useState(false);
    const handleClickMobile = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [isScroll, setIsScroll] = useState({
        onTop: false,
    });

    const logout = async () => {
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        await axios
            .post(apiLogout, { data: "mydata" }, { headers: headers })
            .then((res) => {
                toast.success("Đăng xuất thành công!");
                localStorage.setItem("auth", false);
                deleteCookie("access_token");
            })
            .catch((error) => {
                toast.error("Đăng xuất không thành công!");
                console.error(error);
            });
        window.location.reload();
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.onscroll = () => {
                let currentScrollPos = window.pageYOffset;
                if (
                    currentScrollPos > lastScrollTop &&
                    currentScrollPos > 150
                ) {
                    setIsScroll({ onTop: true });
                } else {
                    setIsScroll({ onTop: false });
                }
                lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
            };
        }
        console.log("cuon xuong:", isScroll.onTop);
    }, [isScroll]);

    return (
        <div id="nav">
            <div className="header">
                <div className="logo-nav">
                    <div className="logo-container">
                        <a
                            href="/"
                            title="Trang chu"
                            style={{
                                padding: 0,
                                margin: 20,
                                backgroundColor: "transparent",
                            }}
                        >
                            <img
                                id="logopersonal"
                                alt="logo"
                                src={Logo}
                                width="50"
                                height="50"
                            />
                        </a>
                    </div>
                </div>
                {!getCookie("access_token") ? (
                    <ul className="signin-up">
                        <li className="sign-in" onClick={closeMobileMenu}>
                            <a href="/login">
                                <i className="fas fa-sign-in-alt icon-btn"></i>
                                Đăng nhập
                            </a>
                        </li>
                        <li className="signup-btn" onClick={closeMobileMenu}>
                            <a href="/register">Đăng ký</a>
                        </li>
                    </ul>
                ) : (
                    <ul className="signin-up">
                        <li className="signup-btn" onClick={closeMobileMenu}>
                            <a onClick={() => logout()}>Đăng xuất</a>
                        </li>
                    </ul>
                )}
            </div>
            <div className="bottomNav">
                <Grid container>
                    <Grid item xs={12} className="searchContainer">
                        <Search />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
