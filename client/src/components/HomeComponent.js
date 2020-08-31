import React from 'react';
import Pariksha_logo from '../shared/Pariksha_logo.jpeg';
import { Media } from 'reactstrap';

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
    return(
        <div className="container">
            <div className="container">
                <h1>Hi, Welcome to Pariksha ...</h1>
                <br></br>
                <br></br>
            </div>
            <RenderSelf />
            <br></br>
            <br></br>
        </div>
    );
}


export default Home;   