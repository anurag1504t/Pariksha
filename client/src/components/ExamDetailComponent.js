import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';

class ExamDetail extends Component {

    constructor(props) {
        super(props);

        this.handleMultiple = this.handleMultiple.bind(this);
        this.handleNumerical = this.handleNumerical.bind(this);
        this.handleSubjective = this.handleSubjective.bind(this);
        
        this.state = {
          score: 0,
          attempted: 0
        };
    }

    handleMultiple(values) {
        alert("Current State is: " + JSON.stringify(values));
        // return false;
    }

    handleNumerical(values) {
        alert("Current State is: " + JSON.stringify(values));
        // return false;
    }

    handleSubjective(values) {
        alert("Current State is: " + JSON.stringify(values));
        // return false;
    }

    render() {
        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.exam != null) {  
            
            const multiple = this.props.exam.multiple.map((Question, index) => {
                return (
                    <LocalForm onSubmit={(values) => this.handleMultiple(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="multiple">Question {index + 1}: {Question.question}</Label>
                                <Control.select model=".answer" key= {Question._id} id="multiple" className="form-control">
                                    <option>Select One</option>
                                    <option>{Question.optionA}</option>
                                    <option>{Question.optionB}</option>
                                    <option>{Question.optionC}</option>
                                    <option>{Question.optionD}</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Button type="submit">Save Answer</Button>
                    </LocalForm>
                );
            });

            const numerical = this.props.exam.numerical.map((Question, index) => {
                return (
                    <LocalForm onSubmit={(values) => this.handleNumerical(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="answer">Question {index + 1}: {Question.question}</Label>
                                <Control.text model=".answer" id="numerical" className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" >Save Answer</Button>
                    </LocalForm>
                );
            });

            const subjective = this.props.exam.subjective.map((Question, index) => {
                return (
                    <LocalForm onSubmit={(values) => this.handleSubjective(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="answer">Question {index + 1}: {Question.question}</Label>
                                <Control.textarea model=".answer" id="subjective" rows="6" className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" >Save Answer</Button>
                    </LocalForm>
                );
            });

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>{this.props.exam.title}</h1>
                            <hr />
                            <p>{this.props.exam.description}</p>
                        </div>
                    </div>
                    <div className="row">  
                        <div className="col-12">
                            <h3>Multiple Choice Questions Section</h3>
                            <hr />
                        </div>
                        <div className="col-12">
                            {multiple}
                        </div> 
                        <br></br><br></br>                       
                    </div>
                    <div className="row">  
                        <div className="col-12">
                            <h3>Numerical Questions Section</h3>
                            <hr />
                        </div>
                        <div className="col-12">
                            {numerical}
                        </div>
                        <br></br><br></br>    
                    </div>
                    <div className="row">  
                        <div className="col-12">
                            <h3>Subjective Questions Section</h3>
                            <hr />
                        </div>
                        <div className="col-12">
                            {subjective}
                        </div> 
                        <br></br><br></br>                            
                    </div>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }

    }
}

export default ExamDetail;