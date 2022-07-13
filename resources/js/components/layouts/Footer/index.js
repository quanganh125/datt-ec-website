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
                    <h3 className="footer-title">Beauty Cent</h3>{" "}
                    <ul>
                        <li>
                            <a href="/"> 紹介 </a>{" "}
                        </li>{" "}
                        <li>
                            <a href="/"> メディア </a>{" "}
                        </li>{" "}
                    </ul>{" "}
                </span>{" "}
            </Grid>{" "}
            <Grid item xs={12} sm={4} className="support">
                <span>
                    <h3 className="footer-title"> 私達と接続 </h3>{" "}
                    <ul>
                        <li style={{ float: "left" }}>
                            <a href="/">
                                <FacebookIcon fontSize="large" />
                            </a>{" "}
                        </li>{" "}
                        <li style={{ float: "left" }}>
                            <a href="/">
                                <InstagramIcon fontSize="large" />
                            </a>{" "}
                        </li>{" "}
                        <li style={{ float: "left" }}>
                            <a href="/">
                                <TwitterIcon fontSize="large" />
                            </a>{" "}
                        </li>{" "}
                    </ul>{" "}
                </span>{" "}
            </Grid>{" "}
            <hr
                style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
                className="line-footer"
            />
            <Grid item xs={12} id="nocopyright">
                <p style={{ color: "white" }}>
                    @2021 - QuangAnh.All Right Reserved.Designed and Developed
                    by & nbsp;{" "}
                    <a
                        href="https://www.facebook.com"
                        rel="name noreferrer"
                        target="_blank"
                        style={{ color: "#0abfd2", textDecoration: "none" }}
                    >
                        QuangAnh{" "}
                    </a>{" "}
                </p>{" "}
            </Grid>{" "}
        </Grid>
    );
}

export default React.memo(Footer);
