import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class ExamDetail extends Component {

    constructor(props) {
        super(props);

        this.handleMultiple = this.handleMultiple.bind(this);
        
        this.state = {
          score: 0,
          attempted: 0
        };
    }

    handleMultiple(values) {
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
                    <FormGroup tag="fieldset">                     
                        <legend>Question {index + 1}: {Question.question}</legend>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name={Question._id} value={Question.optionA}/>{Question.optionA}
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name={Question._id} value={Question.optionB}/>{Question.optionB}
                            </Label>
                        </FormGroup>
                        <FormGroup check >
                            <Label check>
                                <Input type="radio" name={Question._id} value={Question.optionC}/>{Question.optionC}
                            </Label>
                        </FormGroup>
                        <FormGroup check >
                            <Label check>
                                <Input type="radio" name={Question._id} value={Question.optionD}/>{Question.optionD}
                            </Label>
                        </FormGroup>
                    </FormGroup>
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
                        <LocalForm onSubmit={(values) => this.handleMultiple(values)}>
                            {multiple}
                            <Button type="submit">Submit</Button>
                        </LocalForm>
                    </div>
                    <div className="row">
                        <RenderNumerical numerical = {this.props.exam.numerical}  />
                    </div>
                    <div className="row">
                        <RenderSubjective subjective = {this.props.exam.subjective}  />
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

const RenderNumerical = ({numerical}) => {
    if(numerical != null) {
        return(
            <div>
                <h3>Numerical Questions Section</h3>
                <hr />
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

const RenderSubjective = ({subjective}) => {
    if(subjective != null) {
        return(
            <div>
                <h3>Subjective Questions Section</h3>
                <hr />
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

export default ExamDetail;