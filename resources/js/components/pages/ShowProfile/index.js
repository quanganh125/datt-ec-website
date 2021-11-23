import { event } from "jquery";
import React, { Component } from "react";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { toast } from "react-toastify";
import { api } from "../../constant";
class ShowStoreProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            errormessage: "",
            successmessage: "",
            address: "",
            name: "",
            url: "",
            id: this.props.match.params.id,
        };
    }

    componentDidMount() {
        axios
            .get(`${api}api/shop/${this.state.id}`)
            .then((res) => {
                this.setState({
                    name: res.data.data.name,
                    address: res.data.data.address,
                    content: res.data.data.logo,
                    url: res.data.data.url,
                });
                console.log(this.state.address);
                console.log(this.state.content);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/`;
    };

    handleGoToEdit = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/store/${this.state.id}/edit`;
    };
    //xu li url
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
                        <div className="form-group">
                            <label className="form-control">
                                {" "}
                                {this.state.content}
                            </label>
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
                                家に帰る
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ShowStoreProfile;
