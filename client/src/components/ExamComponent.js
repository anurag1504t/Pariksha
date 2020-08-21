import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from './LoadingComponent';

const RenderExamItem = ({ exam }) => {    
    
    console.log(exam);

    return (
        <div>
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>{exam.title}</CardTitle>
                <CardText>Course Code: {exam.courseCode} <br></br> {exam.description}</CardText>
                <CardText>Start Time: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(exam.start)))}</CardText>
                <CardText>End Time: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(exam.end)))}</CardText>
                <Link to={`/exams/${exam._id}`} >
                    <Button>Start</Button>
                </Link>                
            </Card>
        </div>
    );
};

const Exam = (props) => {


    const Exams = props.exams.exams.map((exam) => {
        return (
            <div key={exam._id} className="col-12 col-md-4 m-0" >
                <RenderExamItem exam={exam} />
            </div>
        );
    });

    if (props.exams.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.exams.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.exams.errMess}</h4>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Exams</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Active Exams</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {Exams}
                </div>
                <br></br>
                <br></br>
            </div>
        );
    }
}

export default Exam;