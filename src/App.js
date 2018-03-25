import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

var c_data={},e_data={};
var company = [{ name: "Amezon", address: "Banglore", revanue: 10000, phone: 6565656565 }];
var employees=[{ name: "xyz", address: "Banglore"},{ name: "abc", address: "mysore"}];

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
    console.log(c_data);
    if(c_data.name && c_data.address && c_data.revanue && c_data.phone){
    company.push({name:c_data.name, address: c_data.address, revanue: c_data.revanue, phone: c_data.phone });
    alert("Company Data Saved");
    }    
    else
    alert("Fill all fields");
  }
  update = (name, e) => {
    this.setState({ [name]: e.target.value });
    console.log(this.state);
    c_data=this.state;
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
class Create_new_person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: ""     
    };
  }
  save() {
    console.log(e_data);
    if(e_data.name && e_data.address ){
    employees.push({name:e_data.name, address: e_data.address});
    alert("Employee Data Saved");
    }    
    else
    alert("Fill all fields");
  }
  update = (name, e) => {
    this.setState({ [name]: e.target.value });
    console.log('sss',this.state);
    e_data=this.state;
  }

  render() {

    return (
      <div className=''>
        <div className="form-group">
          <label htmlFor="name f-l">Name:</label>
          <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.update("name", e)} id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="address f-l">Address:</label>
          <input type="text" className="form-control" value={this.state.address} onChange={(e) => this.update("address", e)} id="address" />
        </div>
        <div className="form-group">
          <select className="form-control">
            <option>Select</option>
          </select>
        </div>
        <button className="btn btn-default" onClick={this.save}>Save</button>

      </div>
    );
  }
}
class Panel extends Component {
  render() {
    var page2=<p><b>Total Employees:</b><br />{this.props.phone}</p>;
    var emp= <p><b>Address:</b><br />{this.props.address}</p>
    var page1=<div><p><b>Address:</b><br />{this.props.address}</p>
    <p><b>Revanue:</b><br />{this.props.revanue}</p>
    <p><b>Phone:</b><br />{this.props.phone}</p></div>;
    return (
      <div className="panel panel-info">
        <div className="panel-heading">{this.props.header}</div>
        <div className="panel-body">
         {this.props.page!=='emp'? page1:null}
          {this.props.page==='2'?page2:this.props.page==='emp'?emp:null}
          
        </div>
        <div className="panel-footer">
          {this.props.footer}
        </div>
      </div>

    );
  }
}
class InnerComp extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      employee: []     
    };
  }
  render() {
    this.state.companies = this.props.c_data;
    this.state.employee = this.props.e_data;
    // console.log(this.state.employee);
    
    var footer = <div className="panel-footer">    </div>;
   
    // for (var i = 0; i < employees.length; i++) {
    //   employee.push(<Panel header={employees[i].name} footer='' address={employees[i].address} page='emp' />)
    // }
    return (
      <div className="">
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.header}</div>
          <div className="panel-body">
            {this.props.body === '2' ? <Create_new_company /> : this.props.body === '3' ? <Create_new_person /> : this.props.page==='1'?this.state.companies:this.state.employee}
          </div>
          {this.props.footer === 'true' ? footer : null}
        </div>
      </div>
    );
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      employee: []     
    };
  }
  render() {
    // this.panels=[];
    for (var i = 0; i < company.length; i++) {
     this.state.companies.push(<Panel header={company[i].name} footer='Company Overview' address={company[i].address} revanue={company[i].revanue} phone={company[i].phone} />);
    }
    // this.state.employee=[];
    for (var i = 0; i < employees.length; i++) {
      this.state.employee.push(<Panel header={employees[i].name} footer='' address={employees[i].address} page='emp' />)
    }
    // console.log(this.employee);
    if(this.props.state==='home')
    return (
      <div className="" >
        <div style={{ padding: 40 + 'px' }}>
          <div className="col-md-9">
            <InnerComp header='Companies' footer='false' body='1' page='1' c_data={this.state.companies}/>
          </div>
          <div className="col-md-3" style={{ padding: 0 + 'px' }}>
            <InnerComp header='Create New Company' body='2' />
            <InnerComp header='Create New Person' body='3' />
          </div>
        </div>
      </div>
    );
    else
    return(
      <div className="col-md-8 col-md-offset-2" style={{ padding: 40 + 'px' }}>
          <Panel header='Profile OverView' footer='' body='1' page='2'/>
          <InnerComp header='Employees' footer='' body='1' page='2' e_data={this.state.employee}/>
          </div>
    );
  }
}

export default App;