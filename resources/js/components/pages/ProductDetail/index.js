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
import storage from "../../services/firebaseConfig";
import FormBuy from "../../layouts/FormBuy";

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
            productRecommend: [],
            isOpenBuy: false,
        };
    }

    componentWillUnmount() {
        this.setState({
            name: "",
            image_link: "",
            price: "",
            description: "",
            recommend_mark: "",
            reviews: [],
            category: "",
            shop: "",
            id: null,
            isOpenRate: false,
            isLoading: false,
            shop_id: null,
            linkShop: "",
            currentUserId: null,
            shopIdUser: null,
            productRecommend: [],
            isOpenBuy: false,
        });
    }

    fetchProductDetail = async () => {
        await axios
            .get(`${apiProduct}/${this.state.id}`)
            .then((res) => {
                this.setState({
                    name: res.data.data.name,
                    image_name: res.data.data.image_link,
                    price: res.data.data.price,
                    description: res.data.data.description,
                    recommend_mark: res.data.data.recommend_mark,
                    reviews: res.data.data.reviews,
                    shop: res.data.data.shop,
                    category: res.data.data.category,
                    shop_id: res.data.data.shop_id,
                    linkShop: `/store/${res.data.data.shop_id}`,
                });
                this.getLinkImage(this.state.image_name);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getLinkImage = (name) => {
        storage
            .ref("product_img")
            .child(name)
            .getDownloadURL()
            .then((url) => {
                this.setState({
                    image_link: url,
                    isLoading: true,
                });
            });
    };

    componentWillMount() {
        // this.setState({
        //     currentUserId: this.props.user.id,
        // });
    }

    componentDidUpdate(prevProps) {
        if (this.props.productRecommend !== prevProps.productRecommend) {
            if (!this.state.productRecommend.length) {
                this.setState({
                    productRecommend: this.props.productRecommend,
                });
            }
        }
        if (this.props.user !== prevProps.user) {
            if (!this.state.currentUserId) {
                this.setState({
                    currentUserId: this.props.user.id,
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
        this.fetchProductDetail();
        this.fetchUserShopId();
        this.props.getRecommendDetail(this.getProductId());
    }

    checkReviewed = () => {
        let isExsist = true;
        for (let i = 0; i < this.state.reviews.length; i++) {
            if (this.state.reviews[i].user_id == this.state.currentUserId) {
                isExsist = false;
                break;
            }
        }
        return isExsist;
    };

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
            this.state.shop_id != this.state.shopIdUser &&
            this.checkReviewed()
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

    setIsOpenBuy = (isOpen) => {
        this.setState({
            isOpenBuy: isOpen,
        });
    };

    onClickBuy = () => {
        this.setState({
            isOpenBuy: true,
        });
    };

    handleBuy = () => {};

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
                                        src={this.state.image_link}
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
                                <div className="buy-product">
                                    <Button
                                        onClick={() => this.onClickBuy()}
                                        className="buy-product-btn"
                                        fullWidth
                                    >
                                        購入
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
                            </div>
                        </div>
                        <RatingForm
                            isOpen={this.state.isOpenRate}
                            setIsOpen={this.setIsOpen}
                            productId={this.state.id}
                            reloadReview={this.reloadReview}
                        />
                        <FormBuy
                            isOpen={this.state.isOpenBuy}
                            setIsOpenBuy={this.setIsOpenBuy}
                            product_id={this.state.id}
                            image_link={this.state.image_link}
                            name={this.state.name}
                            description={this.state.description}
                            price={this.state.price}
                            handleBuy={this.handleBuy}
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
