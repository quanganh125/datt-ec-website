import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiCategory, apiProduct } from "../../constant";
import { getCookie } from "./../../utils/cookie";
import storage from "../../services/firebaseConfig";
import Loading from "../../layouts/Loading";
import "./create.scss";

const maxFileSize = 1024 * 1024;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
const init_state = {
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
    color_code: "#ffffff",
    stock: 1,
    discount: 0,
    categories: [],
    isLoading: false,
    isSubmit: false,
};
class CreateProduct extends Component {
    fileRef = React.createRef();
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
        this.state = init_state;
    }

    componentWillUnmount() {
        this.setState(init_state);
    }

    onBtnClick = () => {
        this.fileRef.current.click();
    };
    handleReturnHomePage = () => {
        this.setState({ successmessage: "" });
        window.location.href = `/product/manager`;
    };
    //xu li ten cua san pham
    handleNameChange = (event) => {
        this.setState({ successmessage: "", name: event.target.value });
    };
    handleCategoryChange = (event) => {
        this.setState({ successmessage: "", category: event.target.value });
    };
    //xu li gia cua san pham
    handlePriceChange = (event) => {
        this.setState({ successmessage: "", price: event.target.value });
    };
    handleContentChange = (event) => {
        this.setState({ successmessage: "", content: event.target.value });
    };
    handleStockChange = (event) => {
        this.setState({ successmessage: "", stock: event.target.value });
    };
    handleColorChange = (event) => {
        this.setState({ successmessage: "", color_code: event.target.value });
    };
    handleDiscountChange = (event) => {
        this.setState({ successmessage: "", discount: event.target.value });
    };
    handleFileChange = (event) => {
        this.setState({ successmessage: "" });
        const file = event.target.files[0];
        if (!imageFileRegex.test(file.name)) {
            this.setState({ errormessage: "無効なファイル" });
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
    prepareCreateRequest = () => {
        this.setState({ errormessage: "" });
        storage
            .ref(`/product_img/${this.state.image.name}`)
            .put(this.state.image)
            .on(
                "state_changed",
                (snapShot) => {},
                (err) => {},
                () => {
                    storage
                        .ref("product_img")
                        .child(this.state.image.name)
                        .getDownloadURL()
                        .then((url) => {
                            this.setState({
                                isLoadLinkImage: true,
                            });
                            const packets = {
                                name: this.state.name,
                                price: this.state.price,
                                category_id: this.state.category,
                                description: this.state.content,
                                image_link: url,
                                stock: this.state.stock,
                                discount: this.state.discount,
                                color_code: this.state.color_code,
                            };
                            this.onCreateProduct(packets);
                        });
                }
            );
    };
    handleStockError() {
        if (!this.state.stock && this.state.stock < 1) {
            this.setState({
                errormessage: "在庫には少なくとも1つの製品が必要です",
            });
            return true;
        }
    }
    handleColorCodeError() {
        if (!this.state.color_code) {
            this.setState({
                errormessage: "製品のカラーコードを選択してください",
            });
            return true;
        }
    }
    handleDiscountError() {
        if (
            this.state.discount === "" ||
            this.state.discount < 0 ||
            this.state.discount > 100
        ) {
            this.setState({
                errormessage:
                    "割引率は0％より大きく100％より小さい必要があります",
            });
            return true;
        }
    }
    handleNameError() {
        if (!this.state.name) {
            this.setState({ errormessage: "名前をアップロードしてください" });
            return true;
        }
    }
    handleImageError() {
        if (!this.state.image_link) {
            this.setState({ errormessage: "画像をアップロードしてください" });
            return true;
        }
    }
    handlePriceError() {
        if (!this.state.price || this.state.price < 0) {
            this.setState({
                errormessage: "価格フィールドに数値を入力してください",
            });
            return true;
        } else if (isNaN(this.state.price)) {
            this.setState({ errormessage: "価格を入力してください" });
            return true;
        }
    }
    handleCategoryError() {
        if (!this.state.category) {
            this.setState({ errormessage: "カテゴリを選んでください" });
            return true;
        }
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.setState({ successmessage: "" });
        if (this.handleImageError()) return;
        if (this.handleNameError()) return;
        if (this.handleCategoryError()) return;
        if (this.handlePriceError()) return;
        if (this.handleStockError()) return;
        if (this.handleDiscountError()) return;
        if (this.handleColorCodeError()) return;
        this.prepareCreateRequest();
    };

    onCreateProduct = async (packets) => {
        this.setState({ isSubmit: true });
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        await axios
            .post(apiProduct, packets, { headers: headers })
            .then((response) => {
                toast.success("製品が正常に作成されました！");
                this.setState(init_state);
                setTimeout(() => {
                    window.location.href = `/product/manager`;
                }, 1000);
            })
            .catch(() => {
                toast.error("製品の作成に失敗しました!");
                this.setState({ isSubmit: false });
            });
    };
    componentDidMount() {
        this.fetchAllData();
    }
    fetchAllData = async () => {
        await axios
            .get(`${apiCategory}`)
            .then((res) => {
                const dataCategories = res.data.data;
                this.setState({
                    categories: dataCategories,
                    isLoading: true,
                });
            })
            .catch(() => {});
    };

    render() {
        return (
            <div
                className="row product-create-container"
                style={{ marginTop: "80px" }}
            >
                {this.state.isLoading ? (
                    <div className="form-container">
                        <h3>新製品を作成</h3>
                        <form
                            className="form-wrap"
                            onSubmit={this.handleFormSubmit}
                        >
                            <div className="form-group file-input">
                                <button
                                    type="button"
                                    className="btn btn-primary"
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

                            <div className="d-flex justify-content-around w-100">
                                <div className="form-group p-2">
                                    <h5 className="control-label">名前</h5>
                                    <input
                                        className="form-control"
                                        placeholder="製品名を入力してください ..."
                                        value={this.state.name}
                                        onChange={this.handleNameChange}
                                    />
                                </div>
                                <div className="form-group p-2 w-50">
                                    <h5 className="control-label">
                                        カテゴリー
                                    </h5>
                                    <select
                                        className="form-control"
                                        name="製品のカテゴリを入力してください..."
                                        value={this.state.category}
                                        onChange={this.handleCategoryChange}
                                    >
                                        <option>カテゴリ別</option>
                                        {this.state.categories.map(
                                            (category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="d-flex justify-content-around w-100">
                                <div className="form-group p-2">
                                    <h5 className="control-label">
                                        価格（円）
                                    </h5>
                                    <input
                                        className="form-control"
                                        placeholder="価格を入力してください..."
                                        value={this.state.price}
                                        onChange={this.handlePriceChange}
                                    />
                                </div>
                                <div className="form-group p-2">
                                    <h5 className="control-label">数量</h5>
                                    <input
                                        className="form-control"
                                        placeholder="数量を入力してください..."
                                        type="number"
                                        min={1}
                                        value={this.state.stock}
                                        onChange={this.handleStockChange}
                                    />
                                </div>
                                <div className="form-group p-2 w-75">
                                    <h5>割引（％)</h5>
                                    <input
                                        className="form-control"
                                        placeholder="割引を入力してください..."
                                        value={this.state.discount}
                                        type="number"
                                        min={0}
                                        onChange={this.handleDiscountChange.bind(
                                            this
                                        )}
                                    />
                                </div>
                                <div className="form-group p-2 w-75">
                                    <h5 className="control-label">
                                        カラーコード
                                    </h5>
                                    <input
                                        className="form-control"
                                        style={{ position: "relative", top: 5 }}
                                        placeholder="割引を入力してください..."
                                        type="color"
                                        value={this.state.color_code}
                                        onChange={this.handleColorChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <h5 className="col">説明</h5>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="説明を入力してください ..."
                                    value={this.state.content}
                                    onChange={this.handleContentChange}
                                ></textarea>
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
                                    textAlign: "center",
                                    marginBottom: 30,
                                }}
                            >
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value="作成"
                                    style={{ marginRight: 10, width: "30%" }}
                                    disabled={this.state.isSubmit}
                                />
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={this.handleReturnHomePage}
                                    style={{ marginLeft: 10, width: "30%" }}
                                    disabled={this.state.isSubmit}
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

export default CreateProduct;
