import React, { Component } from "react";
import "../ProductDetail/productDetail.scss";
import StarRatings from "react-star-ratings";
import Pagination from "../../layouts/Pagination";
import { Button } from "@material-ui/core";
import { apiProduct, apiStorage, apiGetShop } from "./../../constant";
import axios from "axios";
import RatingForm from "../../layouts/RatingForm";
import { getCookie } from "../../utils/cookie";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../layouts/Loading";
import { getProductRecommendDetail } from "../../redux/actions/productActions";
import ProductList from "../../layouts/ProductList";
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
            currentUserId: null,
            shopIdUser: null,
            isLoading: false,
            productRecommend: [],
        };
    }

    fetchProductDetail = async () => {
        await axios
            .get(`${apiProduct}/${this.state.id}`)
            .then((res) => {
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
                    isLoading: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentWillMount() {
        this.setState({
            currentUserId: this.props.user.id,
        });
    }

    componentDidUpdate(prevProps) {
        console.log("b");
        if (this.props.productRecommend !== prevProps.productRecommend) {
            if (!this.state.productRecommend.length) {
                this.setState({
                    productRecommend: this.props.productRecommend.slice(0, 2),
                });
            }
        }
    }

    //get shop_id hien tai de so sanh voi shop cua product, giong nhau thi khong duoc comment
    fetchUserShopId = async () => {
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        this.state.currentUserId &&
            (await axios
                .get(`${apiGetShop}/${this.state.currentUserId}`, {
                    headers: headers,
                })
                .then((res) => {
                    const currentShopId = res.data; //shop cua nguoi dung dang xem san pham
                    this.setState({
                        shopIdUser: currentShopId,
                    });
                })
                .catch((error) => {
                    console.error(error);
                }));
    };

    componentDidMount() {
        console.log("a");
        this.fetchProductDetail();
        this.fetchUserShopId();
        this.props.getRecommendDetail(this.getProductId());
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
        if (
            getCookie("access_token") &&
            this.state.shop_id != this.state.shopIdUser
        )
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
                {this.state.isLoading ? (
                    <>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="product-name">
                                    <h1 className="title text-center">
                                        {this.state.name}
                                    </h1>
                                </div>
                                <div className="image">
                                    <img
                                        className="product-image-detail"
                                        alt="productImg"
                                        src={`${apiStorage}/${this.state.image_link}`}
                                        name="image"
                                    />
                                </div>
                                <div className="product-recommend">
                                    <h4>
                                        <b>関連製品</b>
                                    </h4>
                                    <ProductList
                                        currentItems={
                                            this.state.productRecommend
                                        }
                                        type={"detail"}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="product-price">
                                    <label className="title"> 価値： </label>
                                    <h3>
                                        {this.state.price} 円
                                        <span className="lead">
                                            オンライン価格
                                        </span>
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
                                                    <b
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
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
                                        onClick={() =>
                                            this.handeOpenRatingForm()
                                        }
                                        className="item-btn-care"
                                    >
                                        レビュー
                                    </Button>
                                </div>
                                <div className="product-reviews">
                                    <label className="title"> レビュー </label>
                                    <div className="reviews">
                                        <Pagination
                                            dataItems={this.state.reviews}
                                            itemsPerPage={4}
                                            type={"vote-product"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RatingForm
                            isOpen={this.state.isOpenRate}
                            setIsOpen={this.setIsOpen}
                            productId={this.state.id}
                            reloadReview={this.reloadReview}
                        />
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        productRecommend: state.product.product_recommend_detail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRecommendDetail: (id) => dispatch(getProductRecommendDetail(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
