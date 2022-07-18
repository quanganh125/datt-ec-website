import React, { Component } from "react";
const maxFileSize = 1024 * 1024;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { toast } from "react-toastify";
import { apiShop } from "../../constant";
import Loading from "../../layouts/Loading";
import { getCookie } from "./../../utils/cookie";
import storage from "../../services/firebaseConfig";
import "../StoreShow/storeShow.scss";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";

const headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${getCookie("access_token")}`,
};
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const init_state = {
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
    openDialog: false,
};
class EditStoreProfile extends Component {
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
        init_state["id"] =
            this.props.match && this.props.match.params.id
                ? this.props.match.params.id
                : null;
        this.state = init_state;
    }
    onBtnClick = () => {
        this.fileRef.current.click();
    };

    componentWillUnmount() {
        init_state["id"] = null;
        this.setState(init_state);
    }

    handleFileChange = (event) => {
        this.setState({ successmessage: "" });
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
        await axios
            .post(
                `${apiShop}/${this.state.id}/delete`,
                { data: "mydata" },
                { headers: headers }
            )
            .then((response) => {
                toast.success("店舗が正常に削除されました！");
                window.location.href = `/home`;
            })
            .catch((error) => {});
    };
    handleReturnHomePage = () => {
        this.setState({ successmessage: "" });
        window.location.href = `/home`;
    };
    handleUrlChange = (event) => {
        this.setState({ successmessage: "", url: event.target.value });
    };
    handleNameChange = (event) => {
        this.setState({ successmessage: "", name: event.target.value });
    };
    handleaddressChange = (event) => {
        this.setState({ successmessage: "", address: event.target.value });
    };
    handleLogoChange = (event) => {
        this.setState({ successmessage: "", logo: event.target.value });
    };
    handleOpenDialog = (event) => {
        this.setState({ openDialog: true });
    };
    handleCloseDialog = (event) => {
        this.setState({ openDialog: false });
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
                                    (snapShot) => {},
                                    (err) => {},
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
        this.setState({ isSubmit: true });
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
                // console.error("ERROR:: ", error.response.data);
                this.setState({ isSubmit: false });
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
            .catch((error) => {});
    };

    componentDidMount() {
        this.fetchStore();
    }

    render() {
        return (
            <div className="row store-edit-container" style={{ marginTop: 80 }}>
                {this.state.isLoading ? (
                    <div className="form-container">
                        <h3>店舗情報の編集</h3>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="d-flex justify-content-around w-100">
                                <div className="form-group p-2 w-50">
                                    <h5 className="control-label">店舗</h5>
                                    <input
                                        className="form-control"
                                        placeholder="お店の名前を入力してください..."
                                        value={this.state.name}
                                        onChange={this.handleNameChange}
                                    />
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
                                    className="btn btn-primary"
                                    style={{ width: "100%" }}
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
                            <div
                                className="img-container"
                                style={{ height: 200 }}
                            >
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
                                    disabled={this.state.isSubmit}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.handleOpenDialog}
                                    disabled={this.state.isSubmit}
                                >
                                    消去
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={this.handleReturnHomePage}
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
                <Dialog
                    open={this.state.openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCloseDialog}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>
                        {"この店舗を削除してもよろしいですか？"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            店舗とすべての製品は完全に削除されます。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog}>
                            キャンセル
                        </Button>
                        <Button onClick={this.handleDelete}>確認</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditStoreProfile;
