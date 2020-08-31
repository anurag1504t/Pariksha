import React, { Component } from 'react';
import Pariksha_logo from '../shared/Pariksha_logo.jpeg';
import { Link } from 'react-router-dom';
import { Card, CardText, CardTitle, Label, Media, Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';

function RenderSelf() {
    return(
        <Media>
            <Media left middle>
                <Media object src={Pariksha_logo} height="100" width="100" alt="Anurag Tiwari" />
            </Media>
            <Media body className="ml-5">
                <Media heading>Anurag Tiwari</Media>
                CSE Undergraduate, IIIT Gwalior<br></br>
                Batch: B.Tech CSE 2018<br></br>
                CGPA: 8.26<br></br>
            </Media>
        </Media>
    );

}

const RenderExamItem = ({ exam }) => {
    return (
        <div>
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>{exam.title}</CardTitle>
                <CardText>
                    Course Code: {exam.courseCode} <br></br>
                    Batch: B.Tech CSE 2018
                </CardText>
                <Link to={`/edit/${exam._id}`} >
                    <Button>Edit Paper</Button>
                </Link>                
            </Card>
        </div>
    );
};

class Home extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        // this.props.postComment(this.props.dishId, values.rating, values.comment);
    }   

    render() {

        const Exams = this.props.exams.exams.map((exam) => {
            return (
                <div key={exam._id} className="col-12 col-md-4 mb-3" >
                    <RenderExamItem exam={exam} />
                </div>
            );
        });

        if (this.props.exams.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.exams.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.exams.errMess}</h4>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <div className="container">
                        <h1>Hi, Welcome to Pariksha ...</h1>
                        <br></br>
                        <br></br>
                    </div>
                    <RenderSelf />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row"> 
                        <div>
                            <h3>Edit your Question Papers       </h3>
                            <hr /> 
                        </div> 
                            <div className= "ml-auto">
                                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Add Exam</Button>
                                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                    <ModalHeader toggle={this.toggleModal}> Add Exam</ModalHeader>
                                    <ModalBody>
                                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                            <Row className="form-group">
                                                <Col>
                                                    <Label htmlFor="title">Exam Title</Label>
                                                    <Control.text model=".title" id="title" className="form-control" />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Col>
                                                    <Label htmlFor="courseCode">Course Code</Label>
                                                    <Control.text model=".courseCode" id="courseCode" className="form-control" />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Col>
                                                <Label htmlFor="description">Instructions For Exam</Label>
                                                <Control.textarea model=".description" id="description" rows="6" className="form-control" />
                                                </Col>
                                            </Row>
                                            <Button type="submit" className="bg-primary">
                                                Submit
                                            </Button>
                                        </LocalForm>
                                    </ModalBody>
                                </Modal>
                            </div>
                                                                  
                    </div>
                    <div className="row">
                        {Exams}
                    </div>
                </div>
            );
        }
    }
}

export default Home;   