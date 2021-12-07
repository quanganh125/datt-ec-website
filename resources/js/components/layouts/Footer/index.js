import { Grid } from "@material-ui/core";
import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import "./footer.scss";

function Footer() {
    return (
        <Grid container id="footer">
            <hr style={{ width: "100%" }} className="line-footer" />
            <Grid item xs={12} sm={4} className="support">
                <span>
                    <h3 className="footer-title">顧客サポート</h3>
                    <ul>
                        <li>
                            <a href="/">ヘルプセンター</a>
                        </li>
                        <li>
                            <a href="/">安全な売買</a>
                        </li>
                        <li>
                            <a href="/">知っておくべきルール</a>
                        </li>
                        <li>
                            <a href="/">プライバシーポリシー</a>
                        </li>
                        <li>
                            <a href="/">ヘルプに連絡</a>
                        </li>
                    </ul>
                </span>
            </Grid>
            <Grid item xs={12} sm={4} className="support">
                <span>
                    <h3 className="footer-title">
                        レコメンデーションWEBサイト
                    </h3>
                    <ul>
                        <li>
                            <a href="/">紹介</a>
                        </li>
                        <li>
                            <a href="/">メディア</a>
                        </li>
                    </ul>
                </span>
            </Grid>
            <Grid item xs={12} sm={4} className="support">
                <span>
                    <h3 className="footer-title">リンク</h3>
                    <ul>
                        <li style={{ float: "left" }}>
                            <a href="/">
                                <FacebookIcon fontSize="large" />
                            </a>
                        </li>
                        <li style={{ float: "left" }}>
                            <a href="/">
                                <InstagramIcon fontSize="large" />
                            </a>
                        </li>
                        <li style={{ float: "left" }}>
                            <a href="/">
                                <TwitterIcon fontSize="large" />
                            </a>
                        </li>
                    </ul>
                </span>
            </Grid>
            <hr style={{ width: "80%" }} className="line-footer" />
            <Grid item xs={12} id="nocopyright">
                <p style={{ color: "white" }}>
                    @2021 - ZeroTwo. All Right Reserved. Designed and Developed
                    by &nbsp;
                    <a
                        href="https://www.facebook.com"
                        rel="name noreferrer"
                        target="_blank"
                        style={{ color: "#0abfd2", textDecoration: "none" }}
                    >
                        ZeroTwo チーム
                    </a>
                </p>
            </Grid>
        </Grid>
    );
}

export default React.memo(Footer);
