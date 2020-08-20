import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';

const RenderExamItem = (exam) => {    
    console.log(exam);
    return (
        <div>
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>{exam.exam.title}</CardTitle>
                <CardText>Course Code: {exam.exam.courseCode} <br></br> {exam.exam.batch}</CardText>
                <Button>Start</Button>
            </Card>
        </div>
    );
};

const Exam = () => {

    const Array = [
        {
            id: 0,
            title:'Software Engineering Minor-1',
            courseCode:'BCCS - 2103',  
            batch: 'BCS IV'              
        },
        {
            id: 1,
            title:'Theory of Computation Minor-2',
            courseCode:'BCCS - 2101',  
            batch: 'BCS IV'              
        },
        {
            id: 2,
            title:'Artificial Intelligence Minor-1',
            courseCode:'BCCS - 2104',  
            batch: 'BCS IV'              
        }
    ];
    
    const Exams = Array.map((exam) => {
        return (
            <div className="col-12 col-md-4 m-0"  key={exam.id}>
                <RenderExamItem exam={exam} />
            </div>
        );
    });

    
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

export default Exam;