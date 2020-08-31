import React, { Component } from 'react';
import { Control, Form, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { Button, Label, Row, Col } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
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

    handleMultiple(examId, values) {
        // alert("Current State is: " + JSON.stringify(values));
        this.props.postMultiple(examId, values);
        this.props.resetMultipleForm();
        // return false;
        // postMultiple(this.props.exam._id, )
    }

    handleNumerical(examId, values) {
        // alert("Current State is: " + JSON.stringify(values));
        this.props.postNumerical(examId, values);
        this.props.resetNumericalForm();
        // return false;
    }

    handleSubjective(examId, values) {
        // alert("Current State is: " + JSON.stringify(values));
        this.props.postSubjective(examId, values);
        this.props.resetSubjectiveForm();
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
                        <div className="col-6">
                            <h1>Add MCQ</h1>
                            <hr />
                            <Form model="multiple" onSubmit={(values) => this.handleMultiple(this.props.exam._id, values)}>
                                <Row className="form-group">
                                    <Label htmlFor="question" md={12}>Question</Label>
                                    <Col md={12}>
                                        <Control.text model=".question" id="question" name="question"
                                            placeholder="Question"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(100)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".question"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 100 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="optionA" md={2}>Option A</Label>
                                    <Col md={10}>
                                        <Control.text model=".optionA" id="optionA" name="optionA"
                                            placeholder="Option A"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(25)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".optionA"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 25 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="optionB" md={2}>Option B</Label>
                                    <Col md={10}>
                                        <Control.text model=".optionB" id="optionB" name="optionB"
                                            placeholder="Option B"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(25)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".optionB"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 25 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="optionC" md={2}>Option C</Label>
                                    <Col md={0}>
                                        <Control.text model=".optionC" id="optionC" name="optionC"
                                            placeholder="Option C"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(25)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".optionC"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 25 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="optionD" md={2}>Option D</Label>
                                    <Col md={0}>
                                        <Control.text model=".optionD" id="optionD" name="optionD"
                                            placeholder="Option D"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(25)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".optionD"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="solution" md={2}>solution</Label>
                                    <Col md={10}>
                                        <Control.text model=".solution" id="solution" name="solution"
                                            placeholder="solution"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(100)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".solution"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 100 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="marks" md={2}>Marks</Label>
                                    <Col md={10}>
                                        <Control.text model=".marks" id="marks" name="marks"
                                            placeholder="Marks"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(1), maxLength: maxLength(15), isNumber
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".marks"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 0 numbers',
                                                maxLength: 'Must be 15 numbers or less',
                                                isNumber: 'Must be a number'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:12, offset: 0}}>
                                        <Button type="submit" >
                                            Post Multiple Choice Question 
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                            <h1>Add Numerical Questions</h1>
                            <hr />
                            <Form model="numerical" onSubmit={(values) => this.handleNumerical(this.props.exam._id, values)}>
                                <Row className="form-group">
                                    <Label htmlFor="question" md={12}>Question</Label>
                                    <Col md={12}>
                                        <Control.text model=".question" id="question" name="question"
                                            placeholder="Question"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(100)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".question"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 100 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="solution" md={2}>solution</Label>
                                    <Col md={10}>
                                        <Control.text model=".solution" id="solution" name="solution"
                                            placeholder="solution"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(100)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".solution"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 100 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="marks" md={2}>Marks</Label>
                                    <Col md={10}>
                                        <Control.text model=".marks" id="marks" name="marks"
                                            placeholder="Marks"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(1), maxLength: maxLength(15), isNumber
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".marks"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 0 numbers',
                                                maxLength: 'Must be 15 numbers or less',
                                                isNumber: 'Must be a number'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:12, offset: 0}}>
                                        <Button type="submit" >
                                            Post Numerical Question 
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                            <h1>Add Subjective</h1>
                            <hr />
                            <Form model="subjective" onSubmit={(values) => this.handleSubjective(this.props.exam._id, values)}>
                                <Row className="form-group">
                                    <Label htmlFor="question" md={12}>Question</Label>
                                    <Col md={12}>
                                        <Control.text model=".question" id="question" name="question"
                                            placeholder="Question"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(100)
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".question"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 100 characters or less'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="marks" md={2}>Marks</Label>
                                    <Col md={10}>
                                        <Control.text model=".marks" id="marks" name="marks"
                                            placeholder="Marks"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(1), maxLength: maxLength(15), isNumber
                                            }}
                                             />
                                        <Errors
                                            className="text-danger"
                                            model=".marks"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 0 numbers',
                                                maxLength: 'Must be 15 numbers or less',
                                                isNumber: 'Must be a number'
                                            }}
                                         />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:12, offset: 0}}>
                                        <Button type="submit" >
                                            Post Subjective Question 
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>


                        </div>
                        <div className="col-6">
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