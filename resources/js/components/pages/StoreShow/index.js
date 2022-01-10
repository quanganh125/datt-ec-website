import { event } from "jquery";
import React, { Component } from "react";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { apiShop, apiStorage, headers, apiGetShop } from "../../constant";
import Loading from "../../layouts/Loading";
import { getCookie } from "../../utils/cookie";
import storage from "../../services/firebaseConfig";
import "./storeShow.scss";
class ShowStoreProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errormessage: "",
            successmessage: "",
            name: "",
            address: "",
            logo: "",
            url: "",
            logo_url: "",
            id: this.props.match.params.id,
            isLoading: false,
            shopIdUser: null,
        };
    }

    componentDidMount() {
        axios
            .get(`${apiShop}/${this.state.id}`)
            .then((res) => {
                this.setState({
                    name: res.data.data.name,
                    address: res.data.data.address,
                    logo: res.data.data.logo,
                    url: res.data.data.url,
                    isLoading: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
        this.fetchUserShopId();
    }

    componentWillUnmount() {
        this.setState({
            errormessage: "",
            successmessage: "",
            name: "",
            address: "",
            logo: "",
            url: "",
            logo_url: "",
            id: null,
            isLoading: false,
            shopIdUser: null,
        });
    }

    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/home`;
    };

    handleGoToEdit = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/store/${this.state.id}/edit`;
    };

    fetchUserShopId = async () => {
        try {
            await axios
                .get(`${apiGetShop}`, {
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
                });
        } catch (error) {
            console.error(error);
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
                {this.state.isLoading ? (
                    <div className="col-9">
                        <h3>ストアプロファイル</h3>
                        <form>
                            {/* input ten cua cua hang */}
                            <div className="form-group">
                                <h5>名前</h5>
                                <label className="form-control">
                                    {" "}
                                    {this.state.name}
                                </label>

                                {/* input dia chi cua cua hang */}
                            </div>
                            <div className="form-group">
                                <h5>住所</h5>
                                <label className="form-control">
                                    {" "}
                                    {this.state.address}
                                </label>
                            </div>
                            <h5 style={{ marginTop: 20 }}>ロゴ</h5>
                            <div className="img-container form-group">
                                <img
                                    src={this.state.logo}
                                    alt="productImg"
                                    className="itemImg"
                                />
                            </div>
                            <div className="form-group">
                                <h5>ストアのURL</h5>
                                <label className="form-control">
                                    {" "}
                                    {this.state.url}
                                </label>
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
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                {this.state.id == this.state.shopIdUser ? (
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={this.handleGoToEdit}
                                        style={{ margin: 5, width: "20%" }}
                                    >
                                        編集
                                    </button>
                                ) : null}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this.handleReturnHomePage}
                                    style={{ margin: 5, width: "20%" }}
                                >
                                    ホームに戻る
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

export default ShowStoreProfile;
