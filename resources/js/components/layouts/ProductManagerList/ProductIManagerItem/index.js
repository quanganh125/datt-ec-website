import React, { useState, useEffect } from "react";
import "./productManagerItem.scss";
import { Button } from "@material-ui/core";
import Logo from "../../../../assets/images/facebook.png";
import Rate from "./../../Rate";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

export default function Item({ data }) {
    return (
        <Grid container className="item-manager-container">
            <Grid item className="item-manager-image" xs={3}>
                <img src={data.image} alt="productImg" className="itemImg" />
            </Grid>
            <Grid item className="item-manager-content" xs={6}>
                {data.nameProduct}
            </Grid>
            <Grid item className="item-manager-button" xs={3}>
                <Link to="/edit/product/">
                    <Button
                        color="primary"
                        variant="contained"
                        className="item-btn-manager"
                        style={{ fontSize: 15, marginBottom: 2 }}
                    >
                        Chỉnh sửa
                    </Button>
                </Link>
                <Button
                    color="secondary"
                    variant="contained"
                    className="item-btn-manager"
                    style={{ fontSize: 15, marginTop: 2 }}
                >
                    Xóa
                </Button>
            </Grid>
        </Grid>
    );
}
