import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from './LoadingComponent';

const RenderExamItem = ({ exam }) => {
    return (
        <div>
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>{exam.title}</CardTitle>
                <CardText>Course Code: {exam.courseCode}</CardText>
                <CardText>Batch: B.Tech CSE</CardText>
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
            <div key={exam._id} className="col-12 col-md-4 mb-3" >
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
                </div>
                <div className='row'>    
                    <div className="col">
                        <h3>Active Exams</h3>
                        <hr />  
                    </div>
                    <div className= "ml-auto">
                        <Link to='/edits/exam'><Button outline className= "ml-auto"><span className="fa fa-pencil fa-lg"></span>Edit Exams</Button></Link>
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