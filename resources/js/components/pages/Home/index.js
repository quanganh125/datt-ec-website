import React, { useEffect, useState } from "react";
import { Button, DatePicker, version } from "antd";
import { Link } from "react-router-dom";
import "./home.scss";
import ProductList from "../../layouts/ProductList";
import imgTest1 from "../../../assets/images/google.png";


const dataList = [
    {
        id: 0,
        image: imgTest1,
        nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
        infor: "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
        shopName: "FA shop",
        location: "Hà nội",
        rate: 5,
        createAt: new Date(2021, 10, 30, 10, 20, 20),
    },
    {
        id: 1,
        image: imgTest1,
        nameProduct: "Levevo ideapad gaming 3",
        infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
        shopName: "FA shop",
        location: "Hà nội",
        rate: 5,
        createAt: new Date(2021, 10, 30, 10, 20, 20),
    },
    {
        id: 2,
        image: imgTest1,
        nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
        infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
        shopName: "FA shop",
        location: "Hà nội",
        rate: 5,
        createAt: new Date(2021, 10, 30, 10, 20, 20),
    },
    {
        id: 3,
        image: imgTest1,
        nameProduct: "Levevo ideapad gaming 3",
        infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
        shopName: "FA shop",
        location: "Hà nội",
        rate: 5,
        createAt: new Date(2021, 10, 30, 10, 20, 20),
    },
    {
        id: 4,
        image: imgTest1,
        nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
        infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
        shopName: "FA shop",
        location: "Hà nội",
        rate: 5,
        createAt: new Date(2021, 10, 30, 10, 20, 20),
    },
    {
        id: 5,
        image: imgTest1,
        nameProduct: "Levevo ideapad gaming 3",
        infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
        shopName: "FA shop",
        location: "Hà nội",
        rate: 5,
        createAt: new Date(2021, 10, 30, 10, 20, 20),
    },
    {
        id: 6,
        image: imgTest1,
        nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
        infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
        shopName: "FA shop",
        location: "Hà nội",
        rate: 5,
        createAt: new Date(2021, 10, 30, 10, 20, 20),
    },
];

export default function Home() {
    return (
        <div id="homeContainer">
            <h3>レコメンデーション</h3>
            <ProductList dataList={dataList} />
            
        </div>
    );
}
