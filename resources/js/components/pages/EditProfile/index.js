import { event } from "jquery";
import React, { Component } from "react";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { toast } from "react-toastify";
import { apiShop } from "../../constant";
import { getCookie } from "./../../utils/cookie";
class EditStoreProfile extends Component {
    state = {
        content: "",
        errormessage: "",
        successmessage: "",
        address: "",
        name: "",
        url: "",
        id: this.props.match.params.id,
    };
    handleDelete = async (event) => {
        event.preventDefault();
        // const {match} = this.props;
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        await axios
            .post(`${apiShop}/${this.state.id}/delete`, {
                headers: headers,
            })
            .then((response) => {
                console.log("thanh cong");
            })

            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
    };
    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/`;
    };
    //xu li url
    handleUrlChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            url: event.target.value,
        });
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
    //xu li gia cua san pham
    handleaddressChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            address: event.target.value,
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

    handleFormSubmit = async (event) => {
        event.preventDefault();
        // const {match} = this.props;
        const packets = {
            name: this.state.name,
            address: this.state.address,
            //file: this.state.file,
            //category_id: this.state.category,
            logo: this.state.content,
            url: this.state.url,
        };
        await axios
            .post(`${apiShop}/${this.state.id}/edit`, packets)
            .then((response) => {
                toast.success("店舗の更新に成功しました！");
            })
            .catch((error) => {
                toast.error("更新されたストアが失敗しました！");
                console.error("ERROR:: ", error.response.data);
            });
    };

    componentDidMount() {
        const apiGetProduct = `${apiShop}/${this.state.id}`;
        axios
            .get(apiGetProduct)
            .then((response) => {
                let dataShop = response.data.data;
                this.setState({
                    name: dataShop.name,
                    address: dataShop.address,
                    logo: dataShop.logo,
                    url: dataShop.url,
                });
            })
            .catch((error) => {
                console.error("ERROR:: ", error.response.data);
            });
    }

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
                    <h3>ストアを編集する</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        {/* input ten cua cua hang */}
                        <div className="form-group">
                            <h5>名前</h5>
                            <input
                                className="form-control"
                                placeholder="お店の名前を入力してください..."
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            {/* input dia chi cua cua hang */}
                        </div>
                        <div className="form-group">
                            <h5>住所</h5>
                            <input
                                className="form-control"
                                placeholder="住所を入力してください..."
                                value={this.state.address}
                                onChange={this.handleaddressChange}
                            />
                        </div>
                        <div className="form-group">
                            <h5>ロゴ</h5>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="ロゴを入力してください ..."
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <h5>ストアのURL</h5>
                            <input
                                className="form-control"
                                placeholder="URLを入力してください..."
                                value={this.state.url}
                                onChange={this.handleUrlChange}
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
                                value="アップデート"
                                style={{ margin: 5 }}
                            />
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.handleDelete}
                                style={{ margin: 5 }}
                            >
                                消去
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleReturnHomePage}
                                style={{ margin: 5 }}
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

export default EditStoreProfile;
