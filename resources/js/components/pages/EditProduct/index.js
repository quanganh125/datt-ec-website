import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiProduct, apiStorage } from "../../constant";
import { getCookie } from "./../../utils/cookie";
import "./edit.scss";
import Loading from "../../layouts/Loading";

const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
const maxFileSize = 5000000;
class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
        this.state = {
            content: "",
            image_link: "",
            errormessage: "",
            successmessage: "",
            price: "",
            category: "",
            newname: "",
            url: "",
            id: this.props.match.params.id,
            isLoading: false,
        };
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
            content: event.target.value,
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
                errormessage: "ファイルが大きすぎます",
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
                            const packets = {
                                name: this.state.newname,
                                price: this.state.price,
                                category_id: this.state.category,
                                description: this.state.content,
                                image_link: this.state.image_link,
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
        if (!this.state.image_link && !this.state.file) {
            return this.state.image_link;
        } else if (!this.state.file && this.state.image_link) {
            return `${apiStorage}/${this.state.image_link}`;
        } else return this.state.image_link;
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
                    content: dataProduct.description,
                    image_link: dataProduct.image_link,
                    errormessage: "",
                    successmessage: "",
                    price: dataProduct.price,
                    category: dataProduct.category_id,
                    newname: dataProduct.name,
                    id: this.props.match.params.id,
                    isLoading: true,
                });
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
                    marginTop: 150,
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
                                    src={this.getImageSrc()}
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
                                    value={this.state.content}
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
