import React, { useState } from "react";
import axios from 'axios';
import fulllogo from '../asset/fulllogo.png';
import image from '../asset/change-location-img.png';
import './ChangeLocation.css';
import { useNavigate } from "react-router-dom";
function ChangeLocation() {
    const [userLocationId, setUserLocationId] = useState();
    const navigate=useNavigate();
    const searchLocation = () => {

        const options = {
            method: 'GET',
            url: 'https://foreca-weather.p.rapidapi.com/location/search/' + userLocationId,
            params: { lang: 'en', country: 'in' },
            headers: {
                'X-RapidAPI-Key': 'dfb9b7d5b7msh58605fff4558064p180b18jsnce10425639e1',
                'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            if (response.data.locations.length !== 0) {
                localStorage.setItem("currentLocationId", response.data.locations[0].id);
                localStorage.setItem("currentLocation", response.data.locations[0].name + "," + response.data.locations[0].adminArea);
                sessionStorage.setItem("dataload", true);
                navigate("/weatherreport");
            }
            else {
                navigate("/locationerror")
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
    function closeThisMenu() {
        sessionStorage.setItem("dataload",false);
        if (localStorage.getItem("currentLocationId") && localStorage.getItem("currentLocation") && localStorage.getItem("currentLocationId").length) {
            navigate("/weatherreport")
        }
        else {
            navigate("/getstarted");
        }
    }
    return (
        <div className="change-location-container">
            <div className="change-location-menu-container">
                <div className="change-location-navbar">
                    <img src={fulllogo} className="change-location-logo" alt="fulllogo" />
                    <div className="change-location-menu-icon" onClick={closeThisMenu}></div>
                </div>
                <h1 className="change-location-title">CHANGE LOCATION</h1>
            </div>
            <div className="change-location-input-container">
                <div className="change-location-location-icon"></div>
                <input onChange={(e) => {
                    setUserLocationId(e.target.value);
                    console.log(e.target.value);
                }} className="change-location-city-input" placeholder="ENTER YOUR CITY HERE..." />
            </div>
            <div className="change-location-button-container" onClick={searchLocation}>
                <h4>UPDATE</h4>
            </div>
            <img src={image} className="change-location-image" alt="change-location" />
            <h5 className="change-location-devoloper-info">MADE BY BHS HARISH</h5>
        </div>
    )
}
export default ChangeLocation;