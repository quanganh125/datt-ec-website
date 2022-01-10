import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./event.scss";
import coupon from "../../../assets/images/coupon-shopee.png";
import Loading from "../../layouts/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllCouponEvent,
    fetchEvent,
} from "../../redux/actions/EventActions";
import eventBanner from "../../../assets/images/eventBanner.jpg";
import couponBanner from "../../../assets/images/couponBanner.png";
import CheckMark from "../../layouts/CheckMark";

export default function Event() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [stateCopy, setStateCopy] = useState(false);

    const onClickClipboard = (coupon) => {
        navigator.clipboard.writeText(coupon);
        setStateCopy(true);
    };

    const fetchEventData = () => {
        dispatch(fetchEvent(1));
    };

    const fetchCoupon = () => {
        dispatch(fetchAllCouponEvent(1));
    };

    useEffect(() => {
        fetchEventData();
        fetchCoupon();
        return () => {};
    }, []);

    const event_datas = useSelector((state) => state.event.eventData);
    const coupon_datas = useSelector((state) => state.event.couponData);

    useEffect(() => {
        if (event_datas && coupon_datas) {
            setIsLoading(true);
        }
    }, [isLoading, event_datas, coupon_datas]);

    return (
        <div className="event-container">
            {isLoading ? (
                <>
                    <div className="top-event">
                        <img
                            src={eventBanner}
                            alt="top-event"
                            className="image-event"
                        />
                    </div>
                    <div className="discount-event">
                        <img
                            src={couponBanner}
                            alt="top-event"
                            className="image-event"
                        />
                        <div className="list-vouchers">
                            <Grid container spacing={1}>
                                {coupon_datas &&
                                    coupon_datas.map((data, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            lg={4}
                                            key={index}
                                        >
                                            <Grid
                                                container
                                                className="item-manager-container"
                                            >
                                                <Grid
                                                    item
                                                    className="item-manager-image"
                                                    xs={6}
                                                    md={5}
                                                    lg={4}
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
                                                    lg={8}
                                                    onClick={() => nextDetail()}
                                                >
                                                    <h6>
                                                        クーポン: {data.code}
                                                    </h6>
                                                    <p>
                                                        割引: {data.discount}%
                                                    </p>
                                                </Grid>
                                                <div
                                                    className="coupon-clipboard"
                                                    onClick={() =>
                                                        onClickClipboard(
                                                            data.code
                                                        )
                                                    }
                                                >
                                                    <i className="far fa-copy fa-2x"></i>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    ))}
                            </Grid>
                        </div>
                    </div>
                    <div className="copy-check-mark">
                        <CheckMark
                            stateCopy={stateCopy}
                            setStateCopy={setStateCopy}
                        />
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
