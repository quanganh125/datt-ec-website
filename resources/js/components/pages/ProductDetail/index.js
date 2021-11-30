import React, { Component } from "react";
import "../ProductDetail/productDetail.scss";
import StarRatings from "react-star-ratings";
import Review from "./review";
import { Grid, Button } from "@material-ui/core";
import { apiProduct } from "./../../constant";
import axios from "axios";
import RatingForm from "../../layouts/RatingForm";
import { getCookie } from "../../utils/cookie";
import { Link } from "react-router-dom";
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
            isOpenRate: false,
            isLoading: false,
            shop_id: null,
            linkShop: "",
        };
    }

    fetchProductDetail = async () => {
        await axios
            .get(`${apiProduct}/${this.state.id}`)
            .then((res) => {
                console.log(res);
                this.setState({
                    name: res.data.data.name,
                    image_link: res.data.data.image_link,
                    price: res.data.data.price,
                    description: res.data.data.description,
                    recommend_mark: res.data.data.recommend_mark,
                    reviews: res.data.data.reviews,
                    shop: res.data.data.shop,
                    category: res.data.data.category,
                    isLoading: true,
                    shop_id: res.data.data.shop_id,
                    linkShop: `/store/${res.data.data.shop_id}`,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.fetchProductDetail();
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
        var avg = sum / this.state.reviews.length;
        return parseFloat(avg.toFixed(1));
    };

    handeOpenRatingForm = () => {
        if (getCookie("access_token"))
            this.setState({
                isOpenRate: true,
            });
    };

    setIsOpen = (isOpen) => {
        this.setState({
            isOpenRate: isOpen,
        });
    };

    reloadReview = async () => {
        await axios
            .get(`${apiProduct}/${this.state.id}`)
            .then((res) => {
                this.setState({
                    reviews: res.data.data.reviews,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <div className="product-detail-container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="product-name">
                            <h1 className="title text-center">
                                {this.state.name}
                            </h1>
                        </div>

                        <div className="image">
                            {this.state.isLoading ? (
                                <img
                                    className="product-image-detail"
                                    alt="productImg"
                                    src={
                                        require(`../../../../../storage/app/public/product_img/${this.state.image_link}`)
                                            .default
                                    }
                                    name="image"
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="product-price">
                            <label className="title"> 価値： </label>
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
                                        {this.state.description}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>カテゴリー：</b>
                                        {this.state.category}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <Link to={this.state.linkShop}>
                                            <b style={{ color: "black" }}>
                                                店舗：
                                            </b>
                                            {this.state.shop}
                                        </Link>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="review-btn">
                            <Button
                                onClick={() => this.handeOpenRatingForm()}
                                className="item-btn-care"
                            >
                                レビュー
                            </Button>
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
                            {/* <div className="paginate">
                                <Pagination
                                    activePage={0}
                                    itemsCountPerPage={4}
                                    totalItemsCount={this.state.reviews.length}
                                    onChange={(pageNumber) => {
                                        this.reloadReview(pageNumber);
                                    }}
                                    pageRangeDisplayed={8}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First Page"
                                    lastPageText="Last Lage"
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
                <RatingForm
                    isOpen={this.state.isOpenRate}
                    setIsOpen={this.setIsOpen}
                    productId={this.state.id}
                    reloadReview={this.reloadReview}
                />
            </div>
        );
    }
}

export default ProductDetail;
