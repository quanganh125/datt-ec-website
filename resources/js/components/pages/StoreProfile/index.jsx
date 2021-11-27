import { event } from "jquery";
import React, { Component } from "react";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { toast } from "react-toastify";
import { api } from "../../constant";
class StoreProfile extends Component {
    state = {
        content: "",
        errormessage: "",
        successmessage: "",
        address: "",
        name: "",
        url: "",
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
        const packets = {
            name: this.state.name,
            address: this.state.address,
            logo: this.state.content,
            url: this.state.url,
        };
        await axios
            .post(`${api}api/shop`, packets)
            .then((response) => {
                toast.success("ストアを正常に作成する!");
            })

            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
                toast.error("ストアの作成に失敗しました!");
            });
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
                    <h3>ストアを作成する</h3>
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
                                value="作成"
                                style={{ margin: 5 }}
                            />

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

export default StoreProfile;
