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
import { postComment, fetchExams, fetchComments, postFeedback } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        exams: state.exams,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (examId, author, comment) => dispatch(postComment(examId, author, comment)),
    fetchExams: () => { dispatch(fetchExams())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback))
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

        return (
            <div>
                <Header />
                    <div>
                        <TransitionGroup>
                            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                                <Switch>
                                    <Route path='/home' component={HomePage} />
                                    <Route exact path='/aboutus' component={About} />
                                    <Route exact path='/exams' component={Exam} />
                                    <Route exact path="/contactus" component={() => <Contact />} />
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