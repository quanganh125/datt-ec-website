import { event } from "jquery";
import React, { Component } from "react";
const maxFileSize = 1024 * 1024;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { toast } from "react-toastify";
import { apiShop, apiStorage } from "../../constant";
import Loading from "../../layouts/Loading";
import { getCookie } from "./../../utils/cookie";
import storage from "../../services/firebaseConfig";
import "./storeEdit.scss";

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
            logo_url: "",
            new_logo: "",
            new_logo_file: {},
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
            isSubmit: false,
        };
    }
    onBtnClick = () => {
        this.fileRef.current.click();
    };

    componentWillUnmount() {
        this.setState({
            logo: "",
            logo_url: "",
            new_logo: "",
            new_logo_file: {},
            file: "",
            errormessage: "",
            successmessage: "",
            address: "",
            name: "",
            url: "",
            id: null,
            isLoading: false,
            isSubmit: false,
        });
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
                errormessage: "1MB未満の写真のみをアップロードできます",
            });
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                this.setState({
                    errormessage: "",
                    file: file,
                    new_logo: fileReader.result,
                    new_logo_file: file,
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
    handleFormSubmit = (event) => {
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
                        if (this.state.new_logo) {
                            storage
                                .ref(
                                    `/store_logo/${this.state.new_logo_file.name}`
                                )
                                .put(this.state.new_logo_file)
                                .on(
                                    "state_changed",
                                    (snapShot) => {
                                        // console.log(snapShot);
                                    },
                                    (err) => {
                                        console.log(err);
                                    },
                                    () => {
                                        storage
                                            .ref("store_logo")
                                            .child(
                                                this.state.new_logo_file.name
                                            )
                                            .getDownloadURL()
                                            .then((url) => {
                                                this.setState({
                                                    isLoadLinkImage: true,
                                                });
                                                const packets = {
                                                    name: this.state.name,
                                                    address: this.state.address,
                                                    logo: this.state.new_logo
                                                        ? url
                                                        : this.state.logo,
                                                    url: this.state.url,
                                                };
                                                this.onSubmitEditStore(packets);
                                            });
                                    }
                                );
                        } else {
                            const packets = {
                                name: this.state.name,
                                address: this.state.address,
                                logo: this.state.logo,
                                url: this.state.url,
                            };
                            this.onSubmitEditStore(packets);
                        }
                    }
                }
            }
        }
    };

    onSubmitEditStore = async (packets) => {
        this.setState({
            isSubmit: true,
        });
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
                console.error("ERROR:: ", error.response.data);
                this.setState({
                    isSubmit: false,
                });
            });
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
                className="row store-edit-container"
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
                    <div className="form-container">
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
                                    src={
                                        this.state.new_logo
                                            ? this.state.new_logo
                                            : this.state.logo
                                    }
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
                                    className="btn btn-success"
                                    value="アップデート"
                                    style={{ margin: 5, width: "20%" }}
                                    disabled={this.state.isSubmit}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.handleDelete}
                                    style={{ margin: 5, width: "20%" }}
                                    disabled={this.state.isSubmit}
                                >
                                    消去
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={this.handleReturnHomePage}
                                    style={{ margin: 5, width: "20%" }}
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

export default EditStoreProfile;
