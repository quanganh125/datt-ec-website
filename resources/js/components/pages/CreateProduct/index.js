import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiProduct } from "../../constant";
import { getCookie } from "./../../utils/cookie";
import storage from "../../services/firebaseConfig";
import "./create.scss";

const maxFileSize = 1024 * 1024;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
class CreateProduct extends Component {
    fileRef = React.createRef();
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
        this.state = {
            content: "",
            image_link: "",
            category: "",
            file: undefined,
            errormessage: "",
            successmessage: "",
            price: "",
            name: "",
            url: "",
            image: {},
            stock: 1,
            discount: 0,
        };
    }

    componentWillUnmount() {
        this.setState({
            content: "",
            image_link: "",
            category: "",
            file: undefined,
            errormessage: "",
            successmessage: "",
            price: "",
            name: "",
            url: "",
            image: {},
            stock: null,
            discount: null,
        });
    }

    onBtnClick = () => {
        this.fileRef.current.click();
    };
    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/product/manager`;
    };
    //xu li ten cua san pham
    handleNameChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            name: event.target.value,
        });
    };

    handleCategoryChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            category: event.target.value,
        });
    };
    //xu li gia cua san pham
    handlePriceChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            price: event.target.value,
        });
    };
    handleContentChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            content: event.target.value,
        });
    };
    handleStockChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            stock: event.target.value,
        });
    };
    handleDiscountChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            discount: event.target.value,
        });
    };

    handleFileChange = (event) => {
        this.setState({
            successmessage: "",
        });
        const file = event.target.files[0];
        if (!imageFileRegex.test(file.name)) {
            this.setState({
                errormessage: "無効なファイル",
            });
        } else if (file.size > maxFileSize) {
            this.setState({
                errormessage: "1MB未満の写真のみをアップロードできます",
            });
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                this.setState({
                    errormessage: "",
                    file: file,
                    url: fileReader.result.split(",")[1],
                    image_link: fileReader.result,
                    image: file,
                });
            };
        }
    };
    handleFormSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            successmessage: "",
        });
        if (!this.state.name) {
            this.setState({
                errormessage: "名前をアップロードしてください",
            });
        } else if (!this.state.image_link) {
            this.setState({
                errormessage: "画像をアップロードしてください",
            });
        } else {
            if (!this.state.content) {
                this.setState({
                    errormessage: "説明をアップロードしてください",
                });
            } else {
                if (!this.state.price) {
                    this.setState({
                        errormessage: "価格をアップロードしてください",
                    });
                } else {
                    if (isNaN(this.state.price)) {
                        this.setState({
                            errormessage:
                                "価格フィールドに数値を入力してください",
                        });
                    } else {
                        if (!this.state.category) {
                            this.setState({
                                errormessage: "カテゴリを選んでください",
                            });
                        } else {
                            if (!this.state.stock && this.state.stock < 1) {
                                this.setState({
                                    errormessage:
                                        "在庫には少なくとも1つの製品が必要です",
                                });
                            } else {
                                if (
                                    this.state.discount === "" ||
                                    this.state.discount < 0 ||
                                    this.state.discount > 100
                                ) {
                                    this.setState({
                                        errormessage:
                                            "割引率は0％より大きく100％より小さい必要があります",
                                    });
                                } else {
                                    this.setState({
                                        errormessage: "",
                                    });
                                    storage
                                        .ref(
                                            `/product_img/${this.state.image.name}`
                                        )
                                        .put(this.state.image);
                                    const packets = {
                                        name: this.state.name,
                                        price: this.state.price,
                                        category_id: this.state.category,
                                        description: this.state.content,
                                        image_link: this.state.image.name,
                                        stock: this.state.stock,
                                        discount: this.state.discount,
                                    };
                                    const headers = {
                                        "Content-type": "application/json",
                                        Authorization: `Bearer ${getCookie(
                                            "access_token"
                                        )}`,
                                    };
                                    await axios
                                        .post(apiProduct, packets, {
                                            headers: headers,
                                        })
                                        .then((response) => {
                                            toast.success(
                                                "製品が正常に作成されました！"
                                            );
                                            this.setState({
                                                content: "",
                                                image_link: "",
                                                category: "",
                                                file: undefined,
                                                errormessage: "",
                                                successmessage: "",
                                                price: "",
                                                name: "",
                                                url: "",
                                                image: {},
                                                stock: 1,
                                                discount: 0,
                                            });
                                            setTimeout(() => {
                                                window.location.href = `/product/manager`;
                                            }, 1000);
                                        })
                                        .catch((error) => {
                                            toast.error(
                                                "製品の作成に失敗しました!"
                                            );
                                        });
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    render() {
        return (
            <div
                className="row"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    marginTop: 80,
                    minWidth: 600,
                }}
            >
                <div className="col-9">
                    <h3>新製品を作成</h3>
                    <form
                        className="form-wrap"
                        onSubmit={this.handleFormSubmit}
                    >
                        <div className="form-group file-input">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.onBtnClick}
                            >
                                画像を選択 ...
                            </button>
                            <input
                                id="file"
                                type="file"
                                className="upload-input"
                                ref={this.fileRef}
                                accept="image/*"
                                onChange={this.handleFileChange}
                            />
                        </div>
                        {this.state.image_link ? (
                            <div className="img-container">
                                <img
                                    src={`${this.state.image_link}`}
                                    alt="productImg"
                                    className="itemImg"
                                />
                            </div>
                        ) : null}
                        <div className="form-group">
                            <h5>名前</h5>
                            <input
                                className="form-control"
                                placeholder="製品名を入力してください ..."
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <h5>説明</h5>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="説明を入力してください ..."
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <h5>カテゴリー</h5>
                            <select
                                className="form-control"
                                name="製品のカテゴリを入力してください..."
                                value={this.state.category}
                                onChange={this.handleCategoryChange}
                            >
                                <option>カテゴリを選択</option>
                                <option value="1">春</option>
                                <option value="2">夏</option>
                                <option value="3">秋</option>
                                <option value="4">冬</option>
                                <option value="5">なんでもいい</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <h5>価格</h5>
                            <input
                                className="form-control"
                                placeholder="価格を入力してください..."
                                value={this.state.price}
                                onChange={this.handlePriceChange}
                            />
                        </div>
                        <div className="form-group">
                            <h5>数量</h5>
                            <input
                                className="form-control"
                                placeholder="数量を入力してください..."
                                type="number"
                                min={1}
                                value={this.state.stock}
                                onChange={this.handleStockChange}
                            />
                        </div>
                        <div className="form-group">
                            <h5>割引（％）</h5>
                            <input
                                className="form-control"
                                placeholder="割引を入力してください..."
                                value={this.state.discount}
                                type="number"
                                min={0}
                                onChange={this.handleDiscountChange.bind(this)}
                            />
                        </div>
                        <div className="form-group"></div>
                        {this.state.errormessage ? (
                            <div className="alert alert-danger" role="alert">
                                {this.state.errormessage}
                            </div>
                        ) : null}
                        {this.state.successmessage ? (
                            <div className="alert alert-danger" role="alert">
                                {this.state.successmessage}
                            </div>
                        ) : null}
                        <div
                            className="form-group"
                            style={{
                                textAlign: `center`,
                            }}
                        >
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="作成"
                                style={{ marginRight: 10 }}
                            />
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleReturnHomePage}
                                style={{ marginLeft: 10 }}
                            >
                                キャンセル
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateProduct;
