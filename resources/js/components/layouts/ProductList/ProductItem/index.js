import React, { useState, useEffect } from "react";
import "./productItem.scss";
import { Button } from "@material-ui/core";
import Logo from "../../../../assets/images/facebook.png";
import Rate from "./../../Rate";

export default function Item({ data }) {
    return (
        <div className="itemContainer">
            <div className="itemHeader">
                <img src={data.image} alt="productImg" className="itemImg" />
            </div>
            <div className="itemContent">
                <h6>{data.nameProduct}</h6>
                <p className="item-value">Giá: 8.990.000đ</p>
                <Rate numberVoted={data.rate} size={15} choice={data.vote} />
                <div className="item-create-location">
                    <span className="item-location">{data.location}</span>
                </div>
            </div>
            <div className="itemDrop-btn">
                <Button className="item-btn-care">Chi tiết</Button>
                {/* <Button
                    variant="contained"
                    color="primary"
                    className="btn-manager"
                >
                    Chỉnh sửa
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className="btn-manager"
                >
                    Xóa
                </Button> */}
            </div>
        </div>
    );
}
