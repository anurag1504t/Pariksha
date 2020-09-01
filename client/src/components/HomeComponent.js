import React from 'react';
import Pariksha_logo from '../shared/Pariksha_logo.jpeg';
import { Media } from 'reactstrap';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const RenderResult = (props) => {
    const Results = props.results.results.map((result) => {
        var presentExam  = props.exams.exams.filter((exam) => exam._id === result.exam)[0]
        return (
            <div key={result._id} className="p-3 bg-secondary my-2 rounded">
                <Toast>
                    <ToastHeader>
                    Exam Title: {presentExam.title}
                    </ToastHeader>
                    <ToastBody>
                        Marks Obtained: {result.score}/{result.maxScore} <br></br>
                        Exam Attempted Date: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(result.updatedAt)))} <br></br>
                        Result Date: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(result.updatedAt)))}
                    </ToastBody>
                </Toast>
            </div>
        );
    });

    return (
        <div>
            {Results}
        </div>
    );
};

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

function Home(props) {
    // if (props.exams.isLoading) {
    //     return(
    //         <div className="container">
    //             <div className="row">
    //                 <Loading />
    //             </div>
    //         </div>
    //     );
    // }
    // else if (props.exams.errMess) {
    //     return(
    //         <div className="container">
    //             <div className="row">
    //                 <h4>{props.exams.errMess}</h4>
    //             </div>
    //         </div>
    //     );
    // }
    // else {
        return(
            <div className="container">
                <div className="container">
                    <h1>Hi, Welcome to Pariksha ...</h1>
                    <hr/>
                    <br></br>
                    <br></br>
                </div>
                <RenderSelf />
                <br></br>
                <br></br>
                <div className="container">
                    <h1>Your Results</h1>
                    <hr/>
                    <RenderResult results={props.results} exams={props.exams}/>
                </div>
                <br></br>
                <br></br>
            </div>
        );
    // }
}


export default Home;   