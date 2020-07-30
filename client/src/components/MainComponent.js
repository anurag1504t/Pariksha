import React, { Component } from 'react';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Main extends Component {    
    render() {

        const HomePage = () => {
            return (
                <h4>Welcome to Pariksha ...</h4>
            );            
        }

        return (
            <div>
                <Header />
                    <div>
                        <TransitionGroup>
                            
                                <Switch>
                                    <Route path='/home' component={HomePage} />
                                    <Route exact path='/aboutus' component={About} />
                                    <Route exact path="/contactus" component={() => <Contact />} />
                                    <Redirect to="/home" />
                                </Switch>
                            
                        </TransitionGroup>
                    </div>
                <Footer />
            </div>
        );
    }
}
      
export default withRouter(Main);