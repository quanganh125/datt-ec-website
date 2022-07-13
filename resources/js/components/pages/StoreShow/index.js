import React, { Component } from "react";
import { apiShop, headers, apiGetShop } from "../../constant";
import Loading from "../../layouts/Loading";
import "./storeShow.scss";
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
const init_state = {
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
};
class ShowStoreProfile extends Component {
    constructor(props) {
        super(props);
        init_state["id"] = this.props.match.params.id;
        this.state = init_state;
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
            .catch((error) => {});
        this.fetchUserShopId();
    }

    componentWillUnmount() {
        init_state["id"] = null;
        this.setState(init_state);
    }

    handleReturnHomePage = () => {
        this.setState({ successmessage: "" });
        window.location.href = `/home`;
    };

    handleGoToEdit = () => {
        this.setState({ successmessage: "" });
        window.location.href = `/store/${this.state.id}/edit`;
    };

    fetchUserShopId = async () => {
        try {
            await axios
                .get(`${apiGetShop}`, { headers: headers })
                .then((res) => {
                    const currentShopId = res.data; //shop cua nguoi dung
                    this.setState({ shopIdUser: currentShopId });
                })
                .catch((error) => {});
        } catch (error) {}
    };

    render() {
        return (
            <div className="row store-show-container">
                {this.state.isLoading ? (
                    <div className="col-12 form-container">
                        <h3>ストアプロファイル</h3>
                        <form>
                            <div className="d-flex justify-content-around w-100">
                                <div className="form-group p-2 w-50">
                                    <h5>店舗</h5>
                                    <label className="form-control">
                                        {this.state.name}
                                    </label>
                                </div>
                                <div className="form-group p-2 w-50">
                                    <h5>住所</h5>
                                    <label className="form-control">
                                        {this.state.address}
                                    </label>
                                </div>
                            </div>
                            <h5 style={{ marginTop: 20 }}>ロゴ</h5>
                            <div
                                className="img-container form-group"
                                style={{ height: 200 }}
                            >
                                <img
                                    src={this.state.logo}
                                    alt="productImg"
                                    className="itemImg"
                                />
                            </div>
                            <div className="form-group">
                                <h5>ストアのURL</h5>
                                <label className="form-control">
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

                            <div style={{ textAlign: "center" }}>
                                {this.state.id == this.state.shopIdUser ? (
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={this.handleGoToEdit}
                                    >
                                        編集
                                    </button>
                                ) : null}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this.handleReturnHomePage}
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
