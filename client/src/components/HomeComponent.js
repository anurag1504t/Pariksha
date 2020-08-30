import React from 'react';
import Pariksha_logo from '../shared/Pariksha_logo.jpeg';
import { Link } from 'react-router-dom';
import { Card, Button, CardTitle, CardText, Media } from 'reactstrap';
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
                    Batch: B.Tech CSE
                </CardText>
                <Link to={`/edit/${exam._id}`} >
                    <Button>Start</Button>
                </Link>                
            </Card>
        </div>
    );
};

const Home = (props) => {


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
                    <div className="col-12">
                        <h3>Exams</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {Exams}
                </div>
            </div>
        );
    }
}

export default Home;   