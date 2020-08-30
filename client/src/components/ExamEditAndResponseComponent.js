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
        console.log(this.props);
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
                    <LocalForm key={Question._id} onSubmit={(values) => this.handleMultiple(values, Question.question, Question.solution)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="multiple">Question {index + 1}: {Question.question}</Label>
                                <Control.select model=".response" key= {Question._id} id="multiple" className="form-control">
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
                    <LocalForm key={Question._id} onSubmit={(values) => this.handleNumerical(values, Question.question, Question.solution)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="answer">Question {index + 1}: {Question.question}</Label>
                                <Control.text model=".response" id="numerical" className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" >Save Answer</Button>
                    </LocalForm>
                );
            });

            const subjective = this.props.exam.subjective.map((Question, index) => {
                return (
                    <LocalForm key={Question._id} onSubmit={(values) => this.handleSubjective(values, Question.question, Question.solution)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="answer">Question {index + 1}: {Question.question}</Label>
                                <Control.textarea model=".response" id="subjective" rows="6" className="form-control" />
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

export default ExamEditAndResponse;