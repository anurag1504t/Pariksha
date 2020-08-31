import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Exam from './ExamComponent'
import ExamDetail from './ExamDetailComponent';
import ExamEditAndResponse from './ExamEditAndResponseComponent';
import EditExam from './EditExamComponent';
import { actions } from 'react-redux-form';
import { connect } from 'react-redux';
import { postComment, fetchExams, fetchComments, postFeedback, loginUser, logoutUser, fetchResults, fetchResponses, 
    postMultiple, postNumerical, postSubjective, examInit, postMultipleResponse, postNumericalResponse,postSubjectiveResponse } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        exams: state.exams,
        comments: state.comments,
        results: state.results,
        responses: state.responses,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (examId, comment) => dispatch(postComment(examId, comment)),
    fetchExams: () => { dispatch(fetchExams())},
    fetchResults: () => { dispatch(fetchResults())},
    fetchResponses: () => { dispatch(fetchResponses())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    resetMultipleForm: () => { dispatch(actions.reset('multiple'))},
    resetNumericalForm: () => { dispatch(actions.reset('numerical'))},
    resetSubjectiveForm: () => { dispatch(actions.reset('subjective'))},
    fetchComments: () => dispatch(fetchComments()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    postMultiple: (examId, userResponse) => dispatch(postMultiple(examId, userResponse)),
    postNumerical: (examId, userResponse) => dispatch(postNumerical(examId, userResponse)),
    postSubjective: (examId, userResponse) => dispatch(postSubjective(examId, userResponse)),
    examInit: (examId) => dispatch(examInit(examId)),
    postMultipleResponse: (examId, userResponse) => dispatch(postMultipleResponse(examId, userResponse)),
    postNumericalResponse: (examId, userResponse) => dispatch(postNumericalResponse(examId, userResponse)),
    postSubjectiveResponse: (examId, userResponse) => dispatch(postSubjectiveResponse(examId, userResponse)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser())
});

class Main extends Component {    
    
    componentDidMount() {
        this.props.fetchExams();
        this.props.fetchComments();
        this.props.fetchResults();
        this.props.fetchResponses();
    }

    render() {

        const HomePage = () => {
            return (
                <Home 
                    auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser} 
                    exams={this.props.exams}
                    results={this.props.results}                
                />               
            );            
        }

        const ExamWithId = ({match}) => {
            return(
                <ExamDetail exam={this.props.exams.exams.filter((exam) => exam._id === match.params.examId)[0]}
                    isLoading={this.props.exams.isLoading}
                    errMess={this.props.exams.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.exam === match.params.examId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                    postMultipleResponse={this.props.postMultipleResponse}
                    postNumericalResponse={this.props.postNumericalResponse}
                    postSubjectiveResponse={this.props.postSubjectiveResponse}
                    examInit={this.props.examInit}
                />
            );
        }

        const ExamEditWithDetail = ({match}) => {
            return(
                <ExamEditAndResponse exam={this.props.exams.exams.filter((exam) => exam._id === match.params.examId)[0]}
                    isLoading={this.props.exams.isLoading}
                    errMess={this.props.exams.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.exam === match.params.examId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                    resetMultipleForm={this.props.resetMultipleForm}
                    resetNumericalForm={this.props.resetNumericalForm}
                    resetSubjectiveForm={this.props.resetSubjectiveForm}
                    postMultiple={this.props.postMultiple}
                    postNumerical={this.props.postNumerical}
                    postSubjective={this.props.postSubjective}
                    fetchExams={this.props.fetchExams}
                />
            );
        }

        const ExamEdit = () => {
            return (
                <EditExam  
                    exams={this.props.exams}                
                />               
            );            
        }

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                            pathname: '/home',
                            state: { from: props.location }
                    }} />
            )}   />
        );

        return (
            <div>
                <Header 
                    auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser} 
                /> 
                <div>
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch>
                                <Route path='/home' component={HomePage} />
                                <Route exact path='/aboutus' component={About} />
                                <Route exact path='/edit/:examId' component={ExamEditWithDetail}/>
                                <Route exact path='/exams' component={() => <Exam exams={this.props.exams} />} />
                                <Route exact path='/exams/:examId' component={ExamWithId} />
                                <Route exact path='/edits/exam' component={ExamEdit} />
                                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                                <Redirect to="/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <Footer />
            </div>
        );
    }
}
      
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));