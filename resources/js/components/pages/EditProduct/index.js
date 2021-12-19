import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiProduct, apiStorage } from "../../constant";
import { getCookie } from "./../../utils/cookie";
import "./edit.scss";
import Loading from "../../layouts/Loading";
import storage from "../../services/firebaseConfig";
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
const maxFileSize = 1024 * 1024;
class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
        this.state = {
            description: "",
            image_name: "",
            image_link: "",
            new_image: "",
            new_image_file: {},
            errormessage: "",
            successmessage: "",
            price: "",
            category: "",
            newname: "",
            url: "",
            id: this.props.match.params.id,
            isLoading: false,
            stock: "",
            discount:"",
        };
    }

    componentWillUnmount() {
        this.setState({
            description: "",
            image_name: "",
            image_link: "",
            new_image: "",
            new_image_file: {},
            errormessage: "",
            successmessage: "",
            price: "",
            category: "",
            newname: "",
            url: "",
            id: null,
            isLoading: false,
            stock:"",
            discount:"",
        });
    }

    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/home`;
    };
    //xu li ten cua san pham
    handleCategoryChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            category: event.target.value,
        });
    };
    handlenewNameChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            newname: event.target.value,
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
            description: event.target.value,
        });
    };
    handleStockChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            stock: event.target.value,
        })
        if(this.state.stock<1){
            this.setState({
                errormessage: "在庫には少なくとも1つの製品が必要です。",
            });
        }
    };
    handleDiscountChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            discount: event.target.value,
        })
        if(this.state.discount<0 || this.state.discount>100){
            this.setState({
                errormessage: "割引率は0％より大きく100％より小さい必要があります。",
            });
        }
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
                    new_image: fileReader.result,
                    new_image_file: file,
                });
            };
        }
    };
    handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!this.state.newname) {
            this.setState({
                errormessage: "名前をアップロードしてください",
            });
        } else if (!this.state.image_link) {
            this.setState({
                errormessage: "画像をアップロードしてください",
            });
        } else {
            if (!this.state.description) {
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
                            if (this.state.new_image) {
                                storage
                                    .ref(
                                        `/product_img/${this.state.new_image_file.name}`
                                    )
                                    .put(this.state.new_image_file);
                            }
                            const packets = {
                                name: this.state.newname,
                                price: this.state.price,
                                category_id: this.state.category,
                                description: this.state.description,
                                image_link: this.state.new_image
                                    ? this.state.new_image_file.name
                                    : this.state.image_name,
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
                                .post(
                                    `${apiProduct}/${this.state.id}/edit`,
                                    packets,
                                    {
                                        headers: headers,
                                    }
                                )
                                .then((response) => {
                                    toast.success(
                                        "製品の編集に成功しました！!"
                                    );
                                    window.location.href = `/product/manager`;
                                })
                                .catch((error) => {
                                    toast.error("編集に失敗しました!");
                                });
                        }
                    }
                }
            }
        }
    };

    getImageSrc() {
        // if (!this.state.image_link && !this.state.file) {
        //     return this.state.image_link;
        // } else if (!this.state.file && this.state.image_link) {
        //     return `${apiStorage}/${this.state.image_link}`;
        // } else return this.state.image_link;
        return storage
            .ref("product_img")
            .child(this.state.image_name)
            .getDownloadURL()
            .then((url) => {
                if (
                    this.state.new_image == "" &&
                    this.state.isLoading == false
                ) {
                    this.setState({
                        image_link: url,
                        isLoading: true,
                    });
                }
            });
    }

    onBtnClick = () => {
        this.fileRef.current.click();
    };

    componentDidMount() {
        const apiGetProduct = `${apiProduct}/${this.state.id}`;
        axios
            .get(apiGetProduct)
            .then((response) => {
                let dataProduct = response.data.data;
                this.setState({
                    description: dataProduct.description,
                    image_name: dataProduct.image_link,
                    errormessage: "",
                    successmessage: "",
                    price: dataProduct.price,
                    category: dataProduct.category_id,
                    newname: dataProduct.name,
                    id: this.props.match.params.id,
                    stock: dataProduct.stock,
                    discount: dataProduct.discount,
                });
                this.getImageSrc();
            })
            .catch((error) => {
                console.error("ERROR:: ", error.response.data);
            });
    }

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
                }}
            >
                {this.state.isLoading ? (
                    <div className="col-9">
                        <h3>製品の編集</h3>
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
                            <div className="img-container">
                                <img
                                    src={
                                        this.state.new_image
                                            ? this.state.new_image
                                            : this.state.image_link
                                    }
                                    alt="productImg"
                                    className="itemImg"
                                />
                            </div>

                            <div className="form-group">
                                <h5>名前</h5>
                                <input
                                    className="form-control"
                                    placeholder="製品名を入力してください ..."
                                    value={this.state.newname}
                                    onChange={this.handlenewNameChange}
                                />
                            </div>
                            <div className="form-group">
                                <h5>説明</h5>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="4"
                                    placeholder="説明を入力してください ..."
                                    value={this.state.description}
                                    onChange={this.handleContentChange}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <h5>カテゴリー</h5>
                                <select
                                    className="form-control"
                                    placeholder="製品のカテゴリを入力してください..."
                                    value={this.state.category}
                                    onChange={this.handleCategoryChange}
                                >
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
                                <h5>株式</h5>
                                <input
                                    className="form-control"
                                    placeholder="価格を入力してください..."
                                    value={this.state.stock}
                                    onChange={this.handleStockChange}
                                />
                            </div>
                            <div className="form-group">
                                <h5>割引</h5>
                                <input
                                    className="form-control"
                                    placeholder="価格を入力してください..."
                                    value={this.state.discount}
                                    onChange={this.handleDiscountChange}
                                />
                            </div>
                            <div className="form-group"></div>
                            {this.state.errormessage ? (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {this.state.errormessage}
                                </div>
                            ) : null}
                            {this.state.successmessage ? (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
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
                                    value="アップデート"
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
                ) : (
                    <Loading />
                )}
            </div>
        );
    }
}

export default EditProduct;
