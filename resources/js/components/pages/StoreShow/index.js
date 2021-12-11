import { event } from "jquery";
import React, { Component } from "react";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { apiShop, apiStorage } from "../../constant";
import Loading from "../../layouts/Loading";
import { getCookie } from "../../utils/cookie";
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
            id: this.props.match.params.id,
            isLoading: false,
        };
    }

    componentDidMount() {
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
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
                        <h3>ストアプロファイル</h3>
                        <form>
                            {/* input ten cua cua hang */}
                            <h5>名前</h5>
                            <div className="form-group">
                                <label className="form-control">
                                    {" "}
                                    {this.state.name}
                                </label>

                                {/* input dia chi cua cua hang */}
                            </div>
                            <h5>住所</h5>
                            <div className="form-group">
                                <label className="form-control">
                                    {" "}
                                    {this.state.address}
                                </label>
                            </div>
                            <h5>ロゴ</h5>
                            <div className="img-container">
                                <img
                                    src={`${apiStorage}/${this.state.logo}`}
                                    alt="productImg"
                                    className="itemImg"
                                />
                            </div>
                            <h5>ストアのURL</h5>
                            <div className="form-group">
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
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={this.handleGoToEdit}
                                    style={{ margin: 5 }}
                                >
                                    編集
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this.handleReturnHomePage}
                                    style={{ margin: 5 }}
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
