import React from 'react';
import './footer.css';
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