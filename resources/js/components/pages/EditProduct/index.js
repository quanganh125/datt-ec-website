import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
//import { useParams } from 'react-router-dom';
class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props.match.params.id);
        this.state = {
            content: "",
            imageUrl: "",
            // file: undefined,
            errormessage: "",
            successmessage: "",
            price: "",
            category: "",
            newname: "",
            url:"",
            id: this.props.match.params.id,
            // id:"",
        };
    }
    // state = {

    // };
    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/`;
    };
    // handleImageUrlChange = (event) => {
    //     this.setState({
    //         successmessage: "",
    //     });
    //     this.setState({
    //         imageUrl: event.target.value,
    //     });
    // };
    //xu li ten cua san pham
    handleCategoryChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            category: event.target.value,
        });
    };
    handlenewNameChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            newname: event.target.value,
        });
    };
    //xu li gia cua san pham
    handlePriceChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            price: event.target.value,
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
    handleFileChange = (event) => {
        this.setState({
            successmessage: '',
        });
        const file = event.target.files[0];
        if (!imageFileRegex.test(file.name)) {
            this.setState({
                errormessage: 'invalid file',
            });
        }
        else if (file.size > maxFileSize) {
            this.setState({
                errormessage: 'file is too large',
            });

        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                //filereader.result
                console.log(fileReader.result.split(',')[1]);
                this.setState({
                    errormessage: '',
                    file: file,
                    url: fileReader.result.split(',')[1],
                    imageUrl:fileReader.result
                });
            };

        }

    }
    handleFormSubmit = async (event) => {
        event.preventDefault();
        // const {match} = this.props;
        const packets = {
            name: this.state.newname,
            price: this.state.price,
            //file: this.state.file,
            category_id: this.state.category,
            description: this.state.content,
            image_link: this.state.imageUrl,
        };
        await axios
            .post(
                `http://127.0.0.1:8000/api/product/${this.state.id}/edit`,
                packets
            )
            .then((response) => {
                toast.success("Cập nhật sản phẩm thành công!");
                window.location.href = `/product/manager`;
            })
            .catch((error) => {
                toast.error("Cập nhật sản phẩm không thành công!");
                console.error("ERROR:: ", error.response.data);
            });
    };

    componentDidMount() {
        console.log("goi api");
        const apiGetProduct = `http://127.0.0.1:8000/api/product/${this.state.id}`;
        axios
            .get(apiGetProduct)
            .then((response) => {
                console.log("data", response.data.data);
                let dataProduct = response.data.data;
                this.setState({
                    content: dataProduct.description,
                    imageUrl: dataProduct.image_link,
                    errormessage: "",
                    successmessage: "",
                    price: dataProduct.price,
                    category: dataProduct.category_id,
                    newname: dataProduct.name,
                    id: this.props.match.params.id,
                });
            })
            .catch((error) => {
                console.error("ERROR:: ", error.response.data);
            });
    }

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
                    <h3>Edit product</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <div
                                style={{
                                    position: `relative`,
                                    top: `30px`,
                                    textAlign: "center",
                                }}
                            >
                                Select image ...
                            </div>
                            <input
                                id="file"
                                type="file"
                                className="form-control"
                                accept="image/*"
                                style={{
                                    color: "transparent",
                                    margin: `0 auto`,
                                    textIndent: `-999em`,
                                    zIndex: 10,
                                    height: `50px`,
                                }}
                                onChange={this.handleFileChange}
                            />
                        </div>
                        {this.state.imageUrl ? (
                            <div
                                style={{
                                    backgroundImage: `url(${this.state.imageUrl})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    width: "100%",
                                    height: "400px",
                                }}
                            ></div>

                        ) : null}
                        <div className="form-group">
                            <h5>Image</h5>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="Please input image link ..."
                                value={this.state.imageUrl}
                                onChange={this.handleImageUrlChange}
                            ></textarea>
                        </div>
                        {/* input ten cua san pham */}
                        <div className="form-group">
                            <h5>Name</h5>
                            <input
                                className="form-control"
                                placeholder="Please input the new name of the product ..."
                                value={this.state.newname}
                                onChange={this.handlenewNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <h5>Description</h5>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="Please input description ..."
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <h5>Category</h5>
                            <select
                                className="form-control"
                                placeholder="Please input category of the product..."
                                value={this.state.category}
                                onChange={this.handleCategoryChange}
                            >
                                <option>Choose category</option>
                                <option value="1">Spring</option>
                                <option value="2">Summer</option>
                                <option value="3">Autumn</option>
                                <option value="4">Winter</option>
                                <option value="5">Whatever</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <h5>Price</h5>
                            <input
                                className="form-control"
                                placeholder="Please input price..."
                                value={this.state.price}
                                onChange={this.handlePriceChange}
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
                                value="Update"
                                style={{ marginRight: 10 }}
                            />
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleReturnHomePage}
                                style={{ marginLeft: 10 }}
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

export default EditProduct;
