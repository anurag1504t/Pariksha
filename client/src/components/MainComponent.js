import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Exam from './ExamComponent'
// import ExamDetail from './ExamdetailComponent';
import { actions } from 'react-redux-form';
import { connect } from 'react-redux';
import { postComment, fetchExams, fetchComments, postFeedback, loginUser, logoutUser } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        exams: state.exams,
        comments: state.comments,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (examId, author, comment) => dispatch(postComment(examId, author, comment)),
    fetchExams: () => { dispatch(fetchExams())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser())
});

class Main extends Component {    
    
    componentDidMount() {
        this.props.fetchExams();
        this.props.fetchComments();
    }

    render() {

        const HomePage = () => {
            return (
                <Home 
                
                />               
            );            
        }

        // const PrivateRoute = ({ component: Component, ...rest }) => (
        //     <Route {...rest} render={(props) => (
        //         this.props.auth.isAuthenticated
        //             ? <Component {...props} />
        //             : <Redirect to={{
        //                     pathname: '/home',
        //                     state: { from: props.location }
        //             }} />
        //     )}   />
        // );

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
                                <Route exact path='/exams' component={() => <Exam exams={this.props.exams} />} />
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