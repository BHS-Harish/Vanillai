import React, { useEffect } from "react";
import logo from '../asset/logo.png';
import './Loader.css';
function Loader(){
    useEffect(()=>{
        sessionStorage.setItem("dataload",true);
    },[]);
    return(
        <div  className="loader-container">
            <img src={logo} className="small-logo" alt="logo"/>
            <h1 className="LoaderHeading">VANILLAI</h1>
        </div>
    )
}
export default Loader;