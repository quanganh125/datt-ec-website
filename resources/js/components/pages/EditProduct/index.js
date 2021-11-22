import React, { Component } from "react";
import axios from "axios";

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
    handleImageUrlChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            imageUrl: event.target.value,
        });
    };
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

    handleFormSubmit = async(event) => {
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
                alert(JSON.stringify(response.data));
                console.log("thanh cong");
            })

            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
                console.log(" loi");
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
                <div className="col-8">
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
                        </div> */}
                        {/* {this.state.imageUrl ? (
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
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="Please input link ..."
                                value={this.state.imageUrl}
                                onChange={this.handleImageUrlChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="Please input content ..."
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            ></textarea>
                        </div>
                        {/* input ten cua san pham */}
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Please input the new name of the product..."
                                value={this.state.newname}
                                onChange={this.handlenewNameChange}
                            />
                            {/* input gia cua san pham */}
                        </div>
                        <div className="form-group">
                            <h4>Choose a category</h4>
                            <select
                                className="form-control"
                                placeholder="Please input category of the product..."
                                value={this.state.category}
                                onChange={this.handleCategoryChange}
                            >
                                <option>
                                    There are 5 categories.Choose carefully.
                                </option>
                                <option value="1">Spring</option>
                                <option value="2">Summer</option>
                                <option value="3">Autumn</option>
                                <option value="4">Winter</option>
                                <option value="5">Whatever</option>
                            </select>
                        </div>
                        <div className="form-group">
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

export default EditProduct;
