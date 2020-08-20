import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© {new Date().getFullYear()} Pariksha</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;