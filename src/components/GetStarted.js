import React, {useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from '../asset/logo.png';
import './GetStarted.css';
function GetStarted() {
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
                navigate("/weatherreport");
            }
            else {
                navigate("/locationerror");
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
    return (
        <>
            <div className="getstarted-container">
                <img src={logo} className="getstarted-logo" alt="logo" />
                <h3>Welcome To</h3>
                <h1>VANILLAI</h1>
                <h4>SELECT YOUR CITY TO GET STARTED</h4>
                <div className="getstarted-city-input-container">
                    <div className="getstarted-location-icon"></div>
                    <input onChange={(e) => {
                        setUserLocationId(e.target.value);
                        console.log(e.target.value);
                    }} className="getstarted-city-input" placeholder="ENTER YOUR CITY HERE..." />
                </div>
                <div className="getstarted-button-container" onClick={searchLocation}>
                    <h4>GET STARTED</h4>
                    <div className="getstarted-rightarrow-icon"></div>
                </div>
                <h5 className="getstarted-devoloper-info">MADE BY BHS HARISH</h5>
            </div>
        </>
    )
}
export default GetStarted;