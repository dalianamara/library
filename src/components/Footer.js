import React, { Component } from 'react';
import "./Footer.css"
import Faq from "./pages/Faq"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
class Footer extends Component {

    render() {
        return (
           <div className="footer">
                <p style={{fontSize: "15px"}}>Useful information:</p> 
                <div className = "links" ><a><Link to="/faq">Frequent Asked Questions</Link></a>
                <hr style = {{border: "0.1px solid black", borderColor: "rgba(190,190,190, 0.4)", width: "200px", margin: "0px", marginLeft: "9px",marginTop: "5px"}}></hr>
                <a><Link to="/terms">Terms and Conditions</Link></a>
                <hr style = {{border: "0.1px solid black", borderColor: "rgba(190,190,190, 0.4)", width: "200px", margin: "0px", marginLeft: "9px", marginTop: "5px"}}></hr>
                <br/>
                </div>
            </div>
        );
    }
}

export default Footer;