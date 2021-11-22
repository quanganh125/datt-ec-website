// import React from "react";

// export default function CreateProduct() {
//     return (
//         <div>
//             <label class="mdc-text-field mdc-text-field--outlined">
//                 <span class="mdc-notched-outline">
//                     <span class="mdc-notched-outline__leading"></span>
//                     <span class="mdc-notched-outline__notch">
//                         <span class="mdc-floating-label" id="my-label-id">Your Name</span>
//                     </span>
//                     <span class="mdc-notched-outline__trailing"></span>
//                 </span>
//                 <input type="text" class="mdc-text-field__input" aria-labelledby="my-label-id"/>
//             </label>
//         </div>
//     );
// }
import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
class CreateProduct extends Component {
    state = {
        content: "",
        imageUrl: "",
        category: "",
        //file: undefined,
        errormessage: "",
        successmessage: "",
        price: "",
        name: "",
    };
    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/`;
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
    handleImageUrlChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            imageUrl: event.target.value,
        });
    };
    handleCategoryChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            category: event.target.value,
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

    handleFormSubmit = async (event) => {
        // window.location.reload(false);
        event.preventDefault();
        const packets = {
            name: this.state.name,
            price: this.state.price,
            //file: this.state.file,
            category_id: this.state.category,
            description: this.state.content,
            image_link: this.state.imageUrl,
            // userLevel: this.state.userLevel,
            // password: this.state.password
        };
        await axios
            .post("http://127.0.0.1:8000/api/product", packets)
            .then((response) => {
                toast.success("Tạo sản phẩm thành công!");
                window.location.href = `/product/manager`;
            })
            .catch((error) => {
                toast.error("Tạo sản phẩm không thành công!");
                console.error("ERROR:: ", error.response.data);
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
                    <h3>Create new product</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        {/* <div className="form-group">
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
                        ) : null} */}
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
                                placeholder="Please input name of the product ..."
                                value={this.state.name}
                                onChange={this.handleNameChange}
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
                        {/* <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Please input category."
                                value={this.state.category}
                                onChange={this.handleCategoryChange}
                            />
                            
                        </div> */}
                        <div className="form-group">
                            <h5>Category</h5>
                            <select
                                className="form-control"
                                name="Please input category of the product..."
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
                            {/* input gia cua san pham */}
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
                                value="Create"
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

export default CreateProduct;
