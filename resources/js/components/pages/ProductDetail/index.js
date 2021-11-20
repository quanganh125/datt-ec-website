import styled from "styled-components";
import { Button } from "antd";
import React, { Component } from "react";
import { FaStar } from "react-icons/fa";

class ProductDetail extends Component {
    render() {
        const MoreDetail = styled.div`
            width: 25%;
        `;
        console.log("detail");

        const Logo = styled.img`
            width: 120px;
            height: 120px;
            margin-top: 20px;
        `;

        return (
            <div className="container">
                <div className="row">
                    <div
                        className="col-6"
                        style={{ marginTop: 10, textAlign: "center" }}
                    >
                        <div>
                            <img
                                style={{
                                    width: 300,
                                    height: 300,
                                    marginTop: 30,
                                }}
                                src={
                                    "https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg"
                                }
                            />
                        </div>
                        <Button
                            style={{
                                width: 300,
                                marginTop: 30,
                                borderWidth: 1,
                                borderColor: "red",
                            }}
                        >
                            コメントを書く
                        </Button>
                        <div style={{ display: "flex" }}>
                            <p
                                style={{
                                    marginTop: 30,
                                    marginLeft: 50,
                                }}
                            >
                                評価
                            </p>
                            <i
                                className="fas fa-star"
                                style={{ marginTop: 30, marginLeft: 20 }}
                            ></i>
                            <i
                                className="fas fa-star"
                                style={{ marginTop: 30, marginLeft: 20 }}
                            ></i>
                            <i
                                className="fas fa-star"
                                style={{ marginTop: 30, marginLeft: 20 }}
                            ></i>
                            <i
                                className="fas fa-star"
                                style={{ marginTop: 30, marginLeft: 20 }}
                            ></i>
                        </div>
                        <Button
                            style={{
                                width: 300,
                                marginTop: 30,
                                borderWidth: 1,
                                borderColor: "red",
                            }}
                        >
                            関連商品
                        </Button>
                        <div className="row">
                            <div className="col-3">
                                <MoreDetail>
                                    <Logo
                                        src={
                                            "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
                                        }
                                    />
                                    <p>San Pham So 1</p>
                                </MoreDetail>
                            </div>
                            <div className="col-3">
                                <MoreDetail>
                                    <Logo
                                        src={
                                            "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
                                        }
                                    />
                                    <p>San Pham So 1</p>
                                </MoreDetail>
                            </div>
                            <div className="col-3">
                                <MoreDetail>
                                    <Logo
                                        src={
                                            "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
                                        }
                                    />
                                    <p>San Pham So 1</p>
                                </MoreDetail>
                            </div>
                            <div className="col-3">
                                <MoreDetail>
                                    <Logo
                                        src={
                                            "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
                                        }
                                    />
                                    <p>San Pham So 1</p>
                                </MoreDetail>
                            </div>
                        </div>
                    </div>
                    <div className="col-6" style={{ marginTop: 10 }}>
                        <div
                            style={{
                                display: "flex",
                                marginTop: 30,
                            }}
                        >
                            <p>商品の詳細</p>
                            <p style={{ marginLeft: 30 }}>
                                商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            <p>店舗の詳細</p>
                            <p style={{ marginLeft: 30 }}>
                                商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細
                            </p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p
                                style={{
                                    marginTop: 30,
                                }}
                            >
                                評価
                            </p>
                            <i
                                className="fas fa-star"
                                style={{ marginLeft: 20, marginTop: 30 }}
                            ></i>
                            <i
                                className="fas fa-star"
                                style={{ marginLeft: 20, marginTop: 30 }}
                            ></i>
                            <i
                                className="fas fa-star"
                                style={{ marginLeft: 20, marginTop: 30 }}
                            ></i>
                            <i
                                className="fas fa-star"
                                style={{ marginLeft: 20, marginTop: 30 }}
                            ></i>
                        </div>
                        <div
                            className="row"
                            style={{ border: "2px dotted red", width: 500 }}
                        >
                            <div
                                className="col-4"
                                style={{ textAlign: "center" }}
                            >
                                <p style={{ marginTop: 10 }}>名前</p>
                            </div>
                            <div className="col-8">
                                <div style={{ display: "flex" }}>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                </div>
                                <p>
                                    fsafasfassssssssssssssssssssssgfsdghdshdshshds
                                </p>
                            </div>
                        </div>
                        <div
                            className="row"
                            style={{
                                border: "2px dotted red",
                                width: 500,
                                marginTop: 10,
                            }}
                        >
                            <div
                                className="col-4"
                                style={{ textAlign: "center" }}
                            >
                                <p style={{ marginTop: 10 }}>名前</p>
                            </div>
                            <div className="col-8">
                                <div style={{ display: "flex" }}>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                </div>
                                <p>名前fasssssssssssssssssssfasfsafsa</p>
                            </div>
                        </div>
                        <div
                            className="row"
                            style={{
                                border: "2px dotted red",
                                width: 500,
                                marginTop: 10,
                            }}
                        >
                            <div
                                className="col-4"
                                style={{ textAlign: "center" }}
                            >
                                <p style={{ marginTop: 10 }}>名前</p>
                            </div>
                            <div className="col-8">
                                <div style={{ display: "flex" }}>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                </div>
                                <p>名前fasssssssssssssssssssfasfsafsa</p>
                            </div>
                        </div>
                        <div
                            className="row"
                            style={{
                                border: "2px dotted red",
                                width: 500,
                                marginTop: 10,
                            }}
                        >
                            <div
                                className="col-4"
                                style={{ textAlign: "center" }}
                            >
                                <p style={{ marginTop: 10 }}>名前</p>
                            </div>
                            <div className="col-8">
                                <div style={{ display: "flex" }}>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                    <i
                                        className="fas fa-star"
                                        style={{ marginLeft: 20 }}
                                    ></i>
                                </div>
                                <p>名前fasssssssssssssssssssfasfsafsa</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
