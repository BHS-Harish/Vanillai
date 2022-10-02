import React from "react";
import logo from '../asset/logo.png';
import './Loader.css';
function Loader(){
    return(
        <div  className="container">
            <img src={logo} className="small-logo" alt="logo"/>
            <h1>VANILLAI</h1>
        </div>
    )
}
export default Loader;