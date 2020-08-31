import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { Button, Label, Row, Col } from 'reactstrap';

const isNumber = (val) => !isNaN(Number(val));

class ExamEditAndResponse extends Component {

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

    handleMultiple(values, Question, Solution) {
        var response = {};
        response.question = Question;
        response.answer = Solution;
        response.response = values.response;
        alert("Current State is: " + JSON.stringify(response));
        // return false;
        // postMultiple(this.props.exam._id, )
    }

    handleNumerical(values, Question, Answer) {
        alert("Current State is: " + JSON.stringify(values));
        // return false;
    }

    handleSubjective(values, Question, Answer) {
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
                    <div className="MCQ" key={Question._id}>
                        <h6>Question {index + 1}: {Question.question}</h6>
                        <ol>
                            <li>{Question.optionA}</li>
                            <li>{Question.optionB}</li>
                            <li>{Question.optionC}</li>
                            <li>{Question.optionD}</li>
                        </ol>
                        <p>Correct Answer: {Question.solution}</p>
                    </div>
                );
            });

            const numerical = this.props.exam.numerical.map((Question, index) => {
                return (
                    <div className="Numerical" key={Question._id}>
                        <h6>Question {index + 1}: {Question.question}</h6>                        
                        <p>Correct Answer: {Question.solution}</p>
                    </div>
                );
            });

            const subjective = this.props.exam.subjective.map((Question, index) => {
                return (
                    <div className="Numerical" key={Question._id}>
                        <h6>Question {index + 1}: {Question.question}</h6>
                    </div>
                );
            });

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>{this.props.exam.title} Question Paper Edit</h1>
                            <hr />
                            <p>{this.props.exam.description}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">

                        </div>
                        <div className="col-7">
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

export default ExamEditAndResponse;