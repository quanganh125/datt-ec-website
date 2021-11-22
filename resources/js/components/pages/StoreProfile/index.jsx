import { event } from "jquery";
import React, { Component } from "react";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { toast } from "react-toastify";
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
        // const {match} = this.props;
        const packets = {
            name: this.state.name,
            address: this.state.address,
            //file: this.state.file,
            //category_id: this.state.category,
            logo: this.state.content,
            url: this.state.url,
        };
        await axios
            .post(`http://127.0.0.1:8000/api/shop`, packets)
            .then((response) => {
                toast.success("Tạo cửa hàng thành công!");
            })

            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
                toast.error("Tạo cửa hàng không thành công!");
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
                    <h3>Create store</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        {/* input ten cua cua hang */}
                        <div className="form-group">
                            <h5>Name</h5>
                            <input
                                className="form-control"
                                placeholder="Please input name of the store..."
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            {/* input dia chi cua cua hang */}
                        </div>
                        <div className="form-group">
                            <h5>Address</h5>
                            <input
                                className="form-control"
                                placeholder="Please input address..."
                                value={this.state.address}
                                onChange={this.handleaddressChange}
                            />
                        </div>
                        <div className="form-group">
                            <h5>Logo</h5>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="Please input logo ..."
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <h5>Url store</h5>
                            <input
                                className="form-control"
                                placeholder="Please input url..."
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
                                value="Create"
                                style={{ margin: 5 }}
                            />

                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleReturnHomePage}
                                style={{ margin: 5 }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default StoreProfile;
