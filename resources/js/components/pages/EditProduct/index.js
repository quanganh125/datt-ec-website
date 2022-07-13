import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiProduct, apiCategory } from "../../constant";
import { getCookie } from "./../../utils/cookie";
import "../CreateProduct/create.scss";
import Loading from "../../layouts/Loading";
import storage from "../../services/firebaseConfig";
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
const maxFileSize = 1024 * 1024;
const init_state = {
    description: "",
    image_name: "",
    image_link: "",
    new_image: "",
    new_image_file: {},
    errormessage: "",
    successmessage: "",
    price: "",
    category: "",
    new_name: "",
    url: "",
    id: null,
    isLoading: false,
    stock: "",
    color_code: "#ffffff",
    discount: "",
    categories: [],
    isSubmit: false,
};
class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
        init_state["id"] = this.props.match.params.id;
        this.state = init_state;
    }

    componentWillUnmount() {
        init_state["id"] = null;
        this.setState(init_state);
    }

    handleReturnHomePage = () => {
        this.setState({ successmessage: "" });
        window.location.href = `/home`;
    };
    handleReturnProductPage = () => {
        this.setState({ successmessage: "" });
        window.location.href = `/product/manager`;
    };
    //xu li ten cua san pham
    handleCategoryChange = (event) => {
        this.setState({ successmessage: "", category: event.target.value });
    };
    handleNewNameChange = (event) => {
        this.setState({ successmessage: "", new_name: event.target.value });
    };
    //xu li gia cua san pham
    handlePriceChange = (event) => {
        this.setState({ successmessage: "", price: event.target.value });
    };
    handleContentChange = (event) => {
        this.setState({ successmessage: "", description: event.target.value });
    };
    handleStockChange = (event) => {
        this.setState({ successmessage: "", stock: event.target.value });
    };
    handleDiscountChange = (event) => {
        this.setState({ successmessage: "", discount: event.target.value });
    };
    handleColorChange = (event) => {
        this.setState({ successmessage: "", color_code: event.target.value });
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
                    new_image: fileReader.result,
                    new_image_file: file,
                });
            };
        }
    };
    prepareUpdateRequest = () => {
        if (this.state.new_image) {
            storage
                .ref(`/product_img/${this.state.new_image_file.name}`)
                .put(this.state.new_image_file)
                .on(
                    "state_changed",
                    (snapShot) => {},
                    (err) => {},
                    () => {
                        storage
                            .ref("product_img")
                            .child(this.state.new_image_file.name)
                            .getDownloadURL()
                            .then((url) => {
                                this.setState({
                                    isLoadLinkImage: true,
                                });
                                const packets = {
                                    name: this.state.new_name,
                                    price: this.state.price,
                                    category_id: this.state.category,
                                    description: this.state.description,
                                    image_link: this.state.new_image
                                        ? url
                                        : this.state.image_name,
                                    stock: this.state.stock,
                                    discount: this.state.discount,
                                    color_code: this.state.color_code,
                                };
                                this.onEditProductSubmit(packets);
                            });
                    }
                );
        } else {
            const packets = {
                name: this.state.new_name,
                price: this.state.price,
                category_id: this.state.category,
                description: this.state.description,
                image_link: this.state.image_name,
                stock: this.state.stock,
                discount: this.state.discount,
                color_code: this.state.color_code,
            };
            this.onEditProductSubmit(packets);
        }
    };
    handleStockError() {
        if (!this.state.stock && this.state.stock < 1) {
            this.setState({
                errormessage: "在庫には少なくとも1つの製品が必要です",
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
        if (!this.state.new_name) {
            this.setState({ errormessage: "名前をアップロードしてください" });
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
    handleFormSubmit = async (event) => {
        event.preventDefault();
        if (this.handleNameError()) return;
        if (this.handleCategoryError()) return;
        if (this.handlePriceError()) return;
        if (this.handleStockError()) return;
        if (this.handleDiscountError()) return;
        if (this.handleColorCodeError()) return;
        this.prepareUpdateRequest();
    };
    onEditProductSubmit = async (packets) => {
        console.log(packets);
        this.setState({ isSubmit: true });
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        await axios
            .post(`${apiProduct}/${this.state.id}/edit`, packets, {
                headers: headers,
            })
            .then((response) => {
                toast.success("製品の編集に成功しました！!");
                window.location.reload();
                // window.location.href = `/product/manager`;
            })
            .catch((error) => {
                this.setState({ isSubmit: false });
                toast.error("編集に失敗しました!");
            });
    };
    onBtnClick = () => {
        this.fileRef.current.click();
    };
    componentDidMount() {
        this.fetchAllData();
    }
    fetchAllData = async () => {
        const apiGetProduct = `${apiProduct}/${this.state.id}`;
        const apiCate = `${apiCategory}`;
        const getProduct = axios.get(apiGetProduct);
        const getCategory = axios.get(apiCate);

        await axios.all([getProduct, getCategory]).then(
            axios.spread((...allData) => {
                const dataProduct = allData[0].data.data;
                const dataCategory = allData[1].data.data;
                this.setState({
                    description: dataProduct.description,
                    image_name: dataProduct.image_link,
                    errormessage: "",
                    successmessage: "",
                    price: dataProduct.price,
                    category: dataProduct.category_id,
                    new_name: dataProduct.name,
                    id: this.props.match.params.id,
                    stock: dataProduct.stock,
                    discount: dataProduct.discount,
                    categories: dataCategory,
                    color_code: dataProduct.color_code,
                    isLoading: true,
                });
            })
        );
    };

    render() {
        return (
            <div
                className="row product-edit-container"
                style={{ marginTop: "80px" }}
            >
                {this.state.isLoading ? (
                    <div className="form-container">
                        <h3>製品の編集</h3>
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
                            <div className="img-container">
                                <img
                                    src={
                                        this.state.new_image
                                            ? this.state.new_image
                                            : this.state.image_name
                                    }
                                    alt="productImg"
                                    className="itemImg"
                                />
                            </div>
                            <div className="d-flex justify-content-around w-100">
                                <div className="form-group p-2">
                                    <h5 className="control-label">名前</h5>
                                    <input
                                        className="form-control"
                                        placeholder="製品名を入力してください ..."
                                        value={this.state.new_name}
                                        onChange={this.handleNewNameChange}
                                    />
                                </div>
                                <div className="form-group p-2 w-50">
                                    <h5 className="control-label">
                                        カテゴリー
                                    </h5>
                                    <select
                                        className="form-control"
                                        placeholder="製品のカテゴリを入力してください..."
                                        value={this.state.category}
                                        onChange={this.handleCategoryChange}
                                    >
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
                                        placeholder="株式を入力してください..."
                                        type="number"
                                        min={1}
                                        value={this.state.stock}
                                        onChange={this.handleStockChange}
                                    />
                                </div>
                                <div className="form-group p-2 w-75">
                                    <h5>割引（％）</h5>
                                    <input
                                        className="form-control"
                                        placeholder="割引を入力してください..."
                                        type="number"
                                        min={0}
                                        value={this.state.discount}
                                        onChange={this.handleDiscountChange}
                                    />
                                </div>
                                <div className="form-group p-2 w-75">
                                    <h5 className="control-label">
                                        カラーコード
                                    </h5>
                                    <input
                                        className="form-control"
                                        placeholder="割引を入力してください..."
                                        type="color"
                                        value={this.state.color_code}
                                        onChange={this.handleColorChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group p-2">
                                <h5 className="col">説明</h5>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="説明を入力してください ..."
                                    value={this.state.description}
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
                                    textAlign: `center`,
                                    marginBottom: 30,
                                }}
                            >
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value="アップデート"
                                    style={{ marginRight: 10, width: "30%" }}
                                    disabled={this.state.isSubmit}
                                />
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={this.handleReturnProductPage}
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

export default EditProduct;
