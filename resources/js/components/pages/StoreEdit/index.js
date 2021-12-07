import { event } from "jquery";
import React, { Component } from "react";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { toast } from "react-toastify";
import Loading from "../../layouts/Loading";
import { apiShop, apiStorage } from "../../constant";
import { getCookie } from "./../../utils/cookie";

const headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${getCookie("access_token")}`,
};
class EditStoreProfile extends Component {
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
        this.state = {
            logo: "",
            new_logo: "",
            new_logo_url: "",
            file: "",
            errormessage: "",
            successmessage: "",
            address: "",
            name: "",
            url: "",
            id:
                this.props.match && this.props.match.params.id
                    ? this.props.match.params.id
                    : null,
            isLoading: false,
        };
    }
    onBtnClick = () => {
        this.fileRef.current.click();
    };
    getImageSrc() {
        return this.state.new_logo
            ? this.state.new_logo
            : `${apiStorage}/${this.state.logo}`;
    }
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
                    file: file,
                    new_logo_url: fileReader.result.split(",")[1],
                    new_logo: fileReader.result,
                });
            };
        }
    };
    handleDelete = async (event) => {
        event.preventDefault();
        // const {match} = this.props;
        await axios
            .post(
                `${apiShop}/${this.state.id}/delete`,
                { data: "mydata" },
                {
                    headers: headers,
                }
            )
            .then((response) => {
                window.location.href = `/home`;
            })

            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
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
    handleLogoChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            logo: event.target.value,
        });
    };

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
                if (!this.state.logo && !this.state.new_logo) {
                    this.setState({
                        errormessage: "ロゴをアップロードしてください",
                    });
                } else {
                    if (!this.state.url) {
                        this.setState({
                            errormessage: "URLをアップロードしてください",
                        });
                    } else {
                        const packets = {
                            name: this.state.name,
                            address: this.state.address,
                            logo: this.state.new_logo
                                ? this.state.new_logo
                                : this.state.logo,
                            url: this.state.url,
                        };
                        await axios
                            .post(`${apiShop}/${this.state.id}/edit`, packets, {
                                headers: headers,
                            })
                            .then((response) => {
                                window.location.href = `/store/${this.state.id}`;
                                toast.success("店舗の更新に成功しました！");
                            })
                            .catch((error) => {
                                toast.error("更新されたストアが失敗しました！");
                            });
                    }
                }
            }
        }
    };

    fetchStore = async () => {
        const apiGetStore = `${apiShop}/${this.state.id}`;
        await axios
            .get(apiGetStore, { headers: headers })
            .then((response) => {
                let dataShop = response.data.data;
                this.setState({
                    name: dataShop.name,
                    address: dataShop.address,
                    logo: dataShop.logo,
                    url: dataShop.url,
                    isLoading: true,
                });
            })
            .catch((error) => {
                console.error("ERROR:: ", error.response.data);
            });
    };

    componentDidMount() {
        this.fetchStore();
    }

    render() {
        return (
            <div
                className="row"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    marginTop: 110,
                }}
            >
                {this.state.isLoading ? (
                    <div className="col-9">
                        <h3>ストアを編集する</h3>
                        <form onSubmit={this.handleFormSubmit}>
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
                            <div className="img-container">
                                <img
                                    src={this.getImageSrc()}
                                    alt="productImg"
                                    className="itemImg"
                                />
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
                ) : (
                    <Loading />
                )}
            </div>
        );
    }
}

export default EditStoreProfile;
