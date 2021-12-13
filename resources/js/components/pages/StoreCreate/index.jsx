import { event } from "jquery";
import React, { Component } from "react";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { toast } from "react-toastify";
import { apiShop } from "../../constant";
import { getCookie } from "./../../utils/cookie";
import storage from "../../services/firebaseConfig";
class StoreProfile extends Component {
    fileRef = React.createRef();
    state = {
        errormessage: "",
        successmessage: "",
        address: "",
        name: "",
        url: "",
        logo: "",
        logo_url: {},
        isLoadLinkImage: false,
    };

    onBtnClick = () => {
        this.fileRef.current.click();
    };
    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/home`;
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
                    logo_url: file,
                    logo: fileReader.result,
                });
            };
        }
    };

    componentWillUnmount() {
        this.setState({
            errormessage: "",
            successmessage: "",
            address: "",
            name: "",
            url: "",
            logo: "",
            logo_url: {},
            isLoadLinkImage: false,
        });
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!this.state.name) {
            this.setState({
                errormessage: "名前をアップロードしてください",
            });
        } else {
            if (!this.state.address) {
                this.setState({
                    errormessage: "住所をアップロードしてください",
                });
            } else {
                if (!this.state.logo) {
                    this.setState({
                        errormessage: "ロゴをアップロードしてください",
                    });
                } else {
                    if (!this.state.url) {
                        this.setState({
                            errormessage: "URLをアップロードしてください",
                        });
                    } else {
                        storage
                            .ref(`/store_logo/${this.state.logo_url.name}`)
                            .put(this.state.logo_url);
                        // .on(
                        //     "state_changed",
                        //     (snapShot) => {
                        //         // console.log(snapShot);
                        //     },
                        //     (err) => {
                        //         console.log(err);
                        //     },
                        //     () => {
                        //         storage
                        //             .ref("store_logo")
                        //             .child(this.state.logo_url.name)
                        //             .getDownloadURL()
                        //             .then((url) => {
                        //                 this.setState({
                        //                     logo: url,
                        //                     isLoadLinkImage: true,
                        //                 });
                        //                 packets.logo = url;
                        //             });
                        //     }
                        // );
                        const packets = {
                            name: this.state.name,
                            address: this.state.address,
                            logo: this.state.logo_url.name,
                            url: this.state.url,
                        };
                        const headers = {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${getCookie(
                                "access_token"
                            )}`,
                        };
                        await axios
                            .post(apiShop, packets, {
                                headers: headers,
                            })
                            .then((response) => {
                                toast.success("ストアを正常に作成する!");
                                this.setState({
                                    errormessage: "",
                                    successmessage: "",
                                    address: "",
                                    name: "",
                                    url: "",
                                    logo: "",
                                    logo_url: {},
                                });
                                window.location.href = `/home`;
                            })

                            .catch((error) => {
                                toast.error("ストアの作成に失敗しました!");
                            });
                    }
                }
            }
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
                        <div className="form-group file-input">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.onBtnClick}
                            >
                                ロゴを選択 ...
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
                        {this.state.logo ? (
                            <div className="img-container">
                                <img
                                    src={`${this.state.logo}`}
                                    alt="productImg"
                                    className="itemImg"
                                />
                            </div>
                        ) : null}
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
