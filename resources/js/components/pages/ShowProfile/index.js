import { event } from 'jquery';
import React, { Component } from 'react';
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
class ShowStoreProfile extends Component {
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
              name: res.data.data.name,
              address: res.data.data.address,
              content: res.data.data.logo,
              url: res.data.data.url
            });
            console.log(this.state.address)
            console.log(this.state.content)
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
    render() {
        return (
            <div className='row mt-5'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <form >
                        
                        {/* input ten cua cua hang */}
                        <div className="form-group">
                            <label className = "form-control"> {this.state.name}</label>
                            
                            {/* input dia chi cua cua hang */}
                        </div>
                        <div className="form-group">
                        <label className = "form-control"> {this.state.address}</label>
                        </div>
                        <div className="form-group">
                        <label className = "form-control"> {this.state.content}</label>
                        </div>
                        <div className="form-group">
                        <label className = "form-control"> {this.state.url}</label>
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


export default ShowStoreProfile;