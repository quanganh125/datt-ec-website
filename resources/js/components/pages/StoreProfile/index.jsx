import { event } from 'jquery';
import React, { Component } from 'react';
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
class StoreProfile extends Component {
    state = {
        content: '',
        //imageUrl: '',
        //file: undefined,
        errormessage: '',
        successmessage: '',
        address: '',
        name: '',
        url:'',
    };
    handleReturnHomePage = () => {
       
        this.setState({
            successmessage: '',
        });
        window.location.href = `/`;
    }
    //xu li url
    handleUrlChange = (event) => {
        this.setState({
            successmessage:'',
        });
        this.setState({
            url:event.target.value,
        })
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
    handleaddressChange = (event) => {
        this.setState({
            successmessage: '',
        });
        this.setState({
            address: event.target.value,
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
                        
                        //them gia va ten cua san pham vao request.body
                        address: this.state.address,
                        name: this.state.name,
                        url: this.state.url,
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
                        
                        {/* input ten cua cua hang */}
                        <div className="form-group">
                            <input className="form-control" placeholder="Please input name of the store..."
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            {/* input dia chi cua cua hang */}
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Please input address..."
                                value={this.state.address}
                                onChange={this.handleaddressChange}
                            />
                        </div>
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
                        <div className="form-group">
                            <input className="form-control" placeholder="Please input url..."
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


export default StoreProfile;