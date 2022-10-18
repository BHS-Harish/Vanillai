import React from "react";
import { useNavigate } from "react-router-dom";
import fulllogo from '../asset/fulllogo.png';
import './LocationError.css';
function LocationError(){
    const navigate=useNavigate();
    return(
        <div  className="location-error-container">
            <div className="location-error-navbar">
                <img src={fulllogo} className="location-error-logo" alt="fulllogo"/>
                <div className="location-error-menu-icon" onClick={
                    ()=>{
                        navigate("/changelocation");
                    }
                }></div>
            </div>
            <h1>LOCATION NOT FOUND</h1>
            <div className="location-error-main">
                <div></div>
                <div>
                    <h1>PLEASE CHANGE THE</h1>
                    <h2>LOCATION</h2>
                </div>
            </div>
        </div>
    )
}
export default LocationError;