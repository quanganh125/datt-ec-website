import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiProduct } from "../../constant";
import { getCookie } from "./../../utils/cookie";
import "./create.scss";

const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
class CreateProduct extends Component {
    fileRef = React.createRef();
    state = {
        content: "",
        image_link: "",
        category: "",
        file: undefined,
        errormessage: "",
        successmessage: "",
        price: "",
        name: "",
        url: "",
    };

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
                //filereader.result
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
                            const packets = {
                                name: this.state.name,
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
                                .post(apiProduct, packets, { headers: headers })
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
                                    });
                                    window.location.href = `/product/manager`;
                                })
                                .catch((error) => {
                                    toast.error("製品の作成に失敗しました！");
                                });
                        }
                    }
                }
            }
        }
    };
    render() {
        return (
            <div
                className="row mt-5"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
