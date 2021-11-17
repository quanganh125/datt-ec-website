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
import React, { Component } from 'react';
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
class EditProduct extends Component {
    state = {
        content: '',
        imageUrl: '',
        file: undefined,
        errormessage: '',
        successmessage: '',
        price: '',
        name: '',
    };
    handleReturnHomePage = () => {
       
        this.setState({
            successmessage: '',
        });
        window.location.href = `/`;
    }
    //xu li ten cua san pham
    handleNameChange = (event) => {
        this.setState({
            successmessage: '',
        });
        this.setState({
            name: event.target.value,
        })
    }
    //xu li gia cua san pham
    handlePriceChange = (event) => {
        this.setState({
            successmessage: '',
        });
        this.setState({
            price: event.target.value,
        })
    }
    handleContentChange = (event) => {
        this.setState({
            successmessage: '',
        });
        this.setState({
            content: event.target.value,
        })
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
                console.log(fileReader.result);
                this.setState({
                    errormessage: '',
                    file: file,
                    imageUrl: fileReader.result,
                });
            };

        }

    }
    handleFormSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            successmessage: '',
        });
        if (!this.state.content) {
            this.setState({
                errormessage: 'please upload content',

            })
        }
        else if (!this.state.file) {
            this.setState({
                errormessage: 'please upload image',
            })
        } else {
            this.setState({
                errormessage: '',
            })
            try {
                const formData = new FormData();
                formData.append('image', this.state.file);
                console.log(this.state.file);
                const uploadResult = await fetch(`http://localhost:5000/upload/photos`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                }
                )
                    .then((res) => {
                        return res.json();
                    })
                console.log(uploadResult);
                // .then((data) => {
                //     console.log(data);
                // })
                const result = await fetch('http://localhost:5000/post/create-post', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',

                    body: JSON.stringify({
                        content: this.state.content,
                        imageUrl: uploadResult.data,
                        //them gia va ten cua san pham vao request.body
                        price: this.state.price,
                        name: this.state.name,
                    }),
                }).then((res) => {
                    return res.json();
                })
                    .then((data) => {
                        this.setState({
                            successmessage: data.message,
                        });
                    })
                //  window.location.href = `/`;
            } catch (error) {
                this.setState({
                    errormessage: error.message,
                })
            }
        }
    }
    render() {
        return (
            <div className='row mt-5'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className='form-group' >
                            <div
                                style={{
                                    position: `relative`,
                                    top: `30px`,
                                    textAlign: 'center',
                                }}
                            >Select image ...</div>
                            <input
                                id='file'
                                type='file'
                                className='form-control'
                                accept="image/*"
                                style={{
                                    color: 'transparent',
                                    margin: `0 auto`,
                                    textIndent: `-999em`,
                                    zIndex: 10,
                                    height: `50px`
                                }}

                                onChange={this.handleFileChange}
                            />
                        </div>
                        {this.state.imageUrl ? (
                            <div style={{
                                backgroundImage: `url(${this.state.imageUrl})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                width: '100%',
                                height: '400px',

                            }}></div>
                        ) : null}
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder='Please input content ...'
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            ></textarea>
                        </div>
                        {/* input ten cua san pham */}
                        <div className="form-group">
                            <input className="form-control" placeholder="Please input name of the product..."
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            {/* input gia cua san pham */}
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Please input price..."
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
                        <div className='form-group'
                        style = {{
                                textAlign:`center`,
                            }}
                        >
                            <input type='submit' className='btn btn-primary'

                                value='Create' />

                        </div>
                        <div
                        style = {{
                            textAlign:'center',}}
                        >
                            <button type="button" className="btn btn-success"

                                onClick={this.handleReturnHomePage}
                            >Return to home page</button>
                        </div>
                    </form>
                </div>
                <div className='col-2'></div>
            </div>
        )
    }

}


export default EditProduct;