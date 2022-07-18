import { event } from "jquery";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { apiShop } from "../../constant";
import { getCookie } from "./../../utils/cookie";
import storage from "../../services/firebaseConfig";
import "../StoreShow/storeShow.scss";

const maxFileSize = 1024 * 1024;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
const init_state = {
    errormessage: "",
    successmessage: "",
    address: "",
    name: "",
    url: "",
    logo: "",
    logo_url: {},
    isLoadLinkImage: false,
    isSubmit: false,
};
class StoreProfile extends Component {
    fileRef = React.createRef();
    state = init_state;

    onBtnClick = () => {
        this.fileRef.current.click();
    };
    handleReturnHomePage = () => {
        this.setState({ successmessage: "" });
        window.location.href = `/home`;
    };
    //xu li url
    handleUrlChange = (event) => {
        this.setState({
            successmessage: "",
            url: event.target.value,
        });
    };
    //xu li ten cua san pham
    handleNameChange = (event) => {
        this.setState({
            successmessage: "",
            name: event.target.value,
        });
    };
    //xu li gia cua san pham
    handleaddressChange = (event) => {
        this.setState({
            successmessage: "",
            address: event.target.value,
        });
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
                    logo_url: file,
                    logo: fileReader.result,
                });
            };
        }
    };
    componentWillUnmount() {
        this.setState(init_state);
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (!this.state.name) {
            this.setState({ errormessage: "名前をアップロードしてください" });
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
                            .put(this.state.logo_url)
                            .on(
                                "state_changed",
                                (snapShot) => {},
                                (err) => {},
                                () => {
                                    storage
                                        .ref("store_logo")
                                        .child(this.state.logo_url.name)
                                        .getDownloadURL()
                                        .then((url) => {
                                            this.setState({
                                                logo: url,
                                                isLoadLinkImage: true,
                                            });
                                            const packets = {
                                                name: this.state.name,
                                                address: this.state.address,
                                                logo: url,
                                                url: this.state.url,
                                            };
                                            this.onCreateStore(packets);
                                        });
                                }
                            );
                    }
                }
            }
        }
    };
    onCreateStore = async (packets) => {
        this.setState({ isSubmit: true });
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        await axios
            .post(apiShop, packets, { headers: headers })
            .then((response) => {
                toast.success("ストアを正常に作成する!");
                this.setState(init_state);
                window.location.href = `/home`;
            })

            .catch((error) => {
                toast.error("ストアの作成に失敗しました!");
                this.setState({ isSubmit: false });
            });
    };

    render() {
        return (
            <div
                className="row store-create-container"
                style={{ marginTop: 80 }}
            >
                <div className="form-container">
                    <h3>ストアを作成する</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        {/* input ten cua cua hang */}
                        <div className="d-flex justify-content-around w-100">
                            <div className="form-group p-2 w-50">
                                <h5 className="control-label">店舗</h5>
                                <input
                                    className="form-control"
                                    placeholder="お店の名前を入力してください..."
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                                {/* input dia chi cua cua hang */}
                            </div>
                            <div className="form-group p-2 w-50">
                                <h5 className="control-label">住所</h5>
                                <input
                                    className="form-control"
                                    placeholder="住所を入力してください..."
                                    value={this.state.address}
                                    onChange={this.handleaddressChange}
                                />
                            </div>
                        </div>
                        <div className="form-group file-input">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.onBtnClick}
                                style={{ width: "100%" }}
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
                            <div
                                className="img-container"
                                style={{ height: 200 }}
                            >
                                <img
                                    src={`${this.state.logo}`}
                                    alt="productImg"
                                    className="itemImg"
                                />
                            </div>
                        ) : null}
                        <div className="form-group">
                            <h5 className="control-label">ストアのURL</h5>
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
                            style={{ textAlign: `center` }}
                        >
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="作成"
                                style={{ margin: 5, width: "30%" }}
                                disabled={this.state.isSubmit}
                            />
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleReturnHomePage}
                                style={{ margin: 5, width: "30%" }}
                                disabled={this.state.isSubmit}
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
