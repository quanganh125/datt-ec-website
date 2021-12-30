import { Grid } from "@material-ui/core";
import React from "react";
import "./event.scss";
import coupon from "../../../assets/images/coupon-shopee.png";

const datas = [
    { a: 1 },
    { a: 2 },
    { a: 1 },
    { a: 2 },
    { a: 1 },
    { a: 2 },
    { a: 1 },
    { a: 2 },
    { a: 2 },
];

export default function Event() {
    const onClickClipboard = (coupon) => {
        navigator.clipboard.writeText(coupon);
    };

    return (
        <div className="event-container">
            <div className="top-event">
                <img
                    src="https://cf.shopee.vn/file/bfddfdf9437535f6b614cd86a0b94c03"
                    alt="top-event"
                    className="image-event"
                />
            </div>
            <div className="discount-event">
                <img
                    src="https://cf.shopee.vn/file/3c3a2fbf352bfe469df6ca809dedfd48"
                    alt="top-event"
                    className="image-event"
                />
                <div className="list-vouchers">
                    <Grid container spacing={1}>
                        {datas.map((data) => (
                            <Grid item xs={12} md={6} lg={4}>
                                <Grid
                                    container
                                    className="item-manager-container"
                                >
                                    <Grid
                                        item
                                        className="item-manager-image"
                                        xs={6}
                                        md={5}
                                        lg={3}
                                        onClick={() => nextDetail()}
                                    >
                                        <img
                                            src={coupon}
                                            alt="productImg"
                                            className="itemImg"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        className="item-manager-content"
                                        xs={6}
                                        md={7}
                                        lg={9}
                                        onClick={() => nextDetail()}
                                    >
                                        <h6>Coupon: hungday</h6>
                                        <p>Discount: 50%</p>
                                    </Grid>
                                    <div
                                        className="coupon-clipboard"
                                        onClick={() =>
                                            onClickClipboard("coupon")
                                        }
                                    >
                                        <i class="far fa-copy fa-2x"></i>
                                    </div>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}
