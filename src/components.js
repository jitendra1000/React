import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';

class Create_new_company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      revanue:"",
      phone:""
    };
  }
  save() {
    // console.log(c_data);
    // if(c_data.name && c_data.address && c_data.revanue && c_data.phone){
    // company.push({name:c_data.name, address: c_data.address, revanue: c_data.revanue, phone: c_data.phone });
    // alert("Company Data Saved");
    // }    
    // else
    alert("Fill all fields");
  }
  update = (name, e) => {
    this.setState({ [name]: e.target.value });
    console.log(this.state);
  }

  render() {

    return (
      <div className=''>
        <div className="form-group">
          <label htmlFor="name f-l">Name:</label>
          <input type="text" className="form-control input-sm" value={this.state.name} onChange={(e) => this.update("name", e)} id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="address f-l">Address:</label>
          <input type="text" className="form-control input-sm" value={this.state.address} onChange={(e) => this.update("address", e)} id="address" />
        </div><div className="form-group">
          <label htmlFor="revanue f-l">Revanue:</label>
          <input type="text" className="form-control input-sm" value={this.state.revanue} onChange={(e) => this.update("revanue", e)} id="revanue" />
        </div><div className="form-group">
          <label htmlFor="phone f-l">Phone:</label>
          <input type="text" className="form-control input-sm" value={this.state.phone} onChange={(e) => this.update("phone", e)} id="phone" />
        </div>
        <button className="btn btn-default" onClick={this.save}>Save</button>
      </div>
    );
  }
}
export default Create_new_company;
