import { event } from 'jquery';
import React, { Component } from 'react';
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
class DeleteStoreProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: '',
            errormessage: '',
            successmessage: '',
            address: '',
            name: '',
            url:'',
            id: this.props.match.params.id
        };
    }
    
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/shop/${this.state.id}`)
          .then(res => {
            this.setState({
              name: res.data.name,
              address: res.data.address,
              content: res.data.logo,
              url: res.data.url
            });
            console.log(this.state.name)
          })
          .catch((error) => {
            console.log(error);
          })
      }
    handleReturnHomePage = () => {
       
        this.setState({
            successmessage: '',
        });
        window.location.href = `/`;
    }
    //xu li url
    
    
    handleFormSubmit = async(event) => {
        event.preventDefault();
        // const {match} = this.props;
       
        await axios
            .post(
                `http://127.0.0.1:8000/api/shop/${this.state.id}/delete`,
            )
            .then((response) => {
               
                console.log("thanh cong");
            })

            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
                console.log(" loi");
            });
    };
    render() {
        return (
            <div className='row mt-5'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <form onSubmit={this.handleFormSubmit}>
                        
                        {/* input ten cua cua hang */}
                        <div className="form-group">
                            <h3> {this.state.name}</h3>
                            {/* input dia chi cua cua hang */}
                        </div>
                        <div className="form-group">
                           <h3>{this.state.content}</h3>
                        </div>
                        <div className="form-group">
                            <h3>{this.state.address}</h3>
                        </div>
                        <div className="form-group">
                            <h3>{this.state.url}</h3>
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

                                value='Delete' />

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


export default DeleteStoreProfile;