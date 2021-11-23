import React, { Component } from "react";
import "../ProductDetail/productDetail.scss";
import StarRatings from "react-star-ratings";
import Review from "./review";
import { Grid, Button } from "@material-ui/core";
import { apiCategory } from "../../constant";
import { apiProduct } from "./../../redux/actions/productActions";
import axios from "axios";
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image_link: "",
            price: "",
            description: "",
            recommend_mark: "",
            reviews: [],
            category: "",
            shop: "",
            id: this.getProductId(),
        };
    }

    componentDidMount() {
        const getProductApi = axios.get(`${apiProduct}${this.state.id}`);
        const getCategoryApi = axios.get(apiCategory);
        axios.all([getProductApi, getCategoryApi]).then(
            axios.spread((...allData) => {
                const dataProducts = allData[0].data.data;
                const dataCategory = allData[1].data.data;

                this.setState({
                    name: dataProducts.name,
                    image_link: dataProducts.image_link,
                    price: dataProducts.price,
                    description: dataProducts.description,
                    recommend_mark: dataProducts.recommend_mark,
                    reviews: dataProducts.reviews,
                    shop: dataProducts.shop,
                });
                this.setState({
                    category: dataCategory.filter(
                        (element) => element.id === dataProducts.category_id
                    )[0].name,
                });
            })
        );
    }

    getProductId = () => {
        let slice_arr = window.location.href.split("/");
        return slice_arr[slice_arr.length - 2];
    };

    getProductRating = () => {
        if (this.state.reviews.length == 0) return 0;
        let sum = 0;
        this.state.reviews.forEach((element) => {
            sum += element.rating;
        });
        return sum / this.state.reviews.length;
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="product-name">
                            <h1 className="title text-center">
                                {this.state.name}
                            </h1>
                        </div>
                        <div className="image">
                            <img
                                className="product-image"
                                src="https://media.thieunien.vn/thumb/uploads/2021/10/31/tiktoker-reency-ngo-khong-sexy-boc-lua-nhung-thu-hut-hang-trieu-follow_43688.jpg"
                            />
                        </div>
                        <div className="review-btn">
                            <Button className="item-btn-care">レビュー</Button>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="product-price">
                            <label className="title"> 価値 </label>
                            <h3>
                                {this.state.price} 円
                                <span className="lead">オンライン価格</span>
                            </h3>
                        </div>
                        <ul className="theme-offers product-offers">
                            <div className="flex">
                                <div className="elem product-rating">
                                    <div className="product-rating-number">
                                        {this.getProductRating()}
                                    </div>
                                    <div className="product-rating-star">
                                        <StarRatings
                                            rating={this.getProductRating()}
                                            starDimension="15px"
                                            starSpacing="0"
                                            starRatedColor="#d0011b"
                                        />
                                    </div>
                                </div>
                                <div className="product-review-number">
                                    {this.state.reviews.length} レビュー
                                </div>
                            </div>
                        </ul>
                        <div className="product-detail">
                            <label className="title"> 製品詳細 </label>
                            <ul>
                                <li>
                                    <p>
                                        <b>説明：</b>
                                        {this.state.description}{" "}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>カテゴリー：</b>
                                        {this.state.category}{" "}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>店舗：</b>
                                        {this.state.shop}{" "}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="product-reviews">
                            <label className="title"> レビュー </label>
                            <div className="reviews">
                                {this.state.reviews.map((data) => (
                                    <Grid key={data.id}>
                                        <Review data={data} />
                                    </Grid>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
