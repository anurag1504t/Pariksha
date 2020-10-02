import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
  
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(values) {
        alert('Current State is: ' + JSON.stringify(values));
        // POST feedback in Server
        this.props.postFeedback(values);
        this.props.resetFeedbackForm();
        // event.preventDefault();
    }
    render() {
        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>                    
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>  
                    <div className="col-12">
                        <h3>Contact Details:</h3>
                        <hr />
                        <p>Email: anurag1504t@gmail.com, bcs_201811@iiitm.ac.in</p>
                    </div>  
                    
                </div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeRsNJ1H03q1_18YJNxpYzU9l936AapudCnrA8mVw8mWApGoQ/viewform" target="_blank" >
                    Please help us
                    to contribute more by providing your valuable feedback
                  </a> 
                  <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
                 

            </div>
        );
    }
}

export default Contact;