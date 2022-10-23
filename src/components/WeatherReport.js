import React, { useEffect, useState } from "react";
import axios from "axios";
import { setWeatherReport } from '../redux/Actions/Vanillai_Actions';
import fulllogo from '../asset/fulllogo.png';
import currentlocationicon from '../asset/current-location.png';
import sunrise from '../asset/sunrise.png';
import sunset from '../asset/sunset.png';
import wind from '../asset/daywind.png';
import rainprob from '../asset/dayrain.png';
import uvindex from '../asset/dayuv.png';
import clear from '../asset/clear.png';
import mostlyclear from '../asset/mostly clear.png';
import overcast from '../asset/overcast.png';
import partlycloudy from '../asset/partly cloudy.png';
import cloudy from '../asset/cloudy.png';
import lightrain from '../asset/light rain.png';
import showers from '../asset/showers.png';
import rain from '../asset/rain.png';
import thunderstorms from '../asset/thunderstorms.png';
import lottieloader from '../asset/lottie-ani.gif';
import './WeatherReport.css';
import { useDispatch,useSelector} from "react-redux";
// import { dummy } from "./dummyData";
import { useNavigate } from "react-router-dom";
function WeatherReport() {

    const [current, setCurrent] = useState("");
    const [hourly, setHourly] = useState("");
    const [daily, setDaily] = useState("");
    const [loading, setLoading] = useState(true);
    const date = require('date-and-time');
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let state = useSelector((state) => state.Vanillai);
    // let state=dummy;
    setTimeout(() => {
        setLoading(false);
    }, 3000);
    const getCurrentReport = () => {
        const options = {
            method: 'GET',
            url: 'https://foreca-weather.p.rapidapi.com/current/' + localStorage.getItem("currentLocationId"),
            params: { alt: '0', tempunit: 'C', windunit: 'KMH', tz: 'India/Culcatta', lang: 'en' },
            headers: {
                'X-RapidAPI-Key': 'dfb9b7d5b7msh58605fff4558064p180b18jsnce10425639e1',
                'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setCurrent(response.data.current);
        }).catch(function (error) {
            console.error(error);
        });
    }
    const getHourlyReport = () => {
        const options = {
            method: 'GET',
            url: 'https://foreca-weather.p.rapidapi.com/forecast/hourly/' + localStorage.getItem("currentLocationId"),
            params: {
                alt: '0',
                tempunit: 'C',
                windunit: 'KMH',
                tz: 'India/Calcutta',
                periods: '8',
                dataset: 'full',
                history: '0'
            },
            headers: {
                'X-RapidAPI-Key': 'dfb9b7d5b7msh58605fff4558064p180b18jsnce10425639e1',
                'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setHourly(response.data.forecast);
        }).catch(function (error) {
            console.error(error);
        });
    }
    const getDailyReport = () => {
        const options = {
            method: 'GET',
            url: 'https://foreca-weather.p.rapidapi.com/forecast/daily/' + localStorage.getItem("currentLocationId"),
            params: { alt: '0', tempunit: 'C', windunit: 'KMH', periods: '8', dataset: 'full' },
            headers: {
                'X-RapidAPI-Key': 'dfb9b7d5b7msh58605fff4558064p180b18jsnce10425639e1',
                'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setDaily(response.data.forecast);
        }).catch(function (error) {
            console.error(error);
        });
    }
    useEffect(() => {
        if (sessionStorage.getItem("dataload")!==false) {
            getCurrentReport();
            getHourlyReport();
            getDailyReport();
            sessionStorage.setItem("dataload", false);
        }
    }, []);
    useEffect(() => {
        dispatch(setWeatherReport({ "Current": current, "Hourly": hourly, "Daily": daily }));
    }, [current,hourly,daily,dispatch]);
    return (
        <>
            {
                loading ?
                    <div className="please-wait">
                        <img src={lottieloader} alt="lottie-loader"/>
                    </div>
                    :
                    <>
                        <div className="weather-report-container">
                            <div className="weather-report-navbar">
                                <img src={fulllogo} className="weather-report-logo" alt="fulllogo" />
                                <div className="weather-report-menu-icon" onClick={
                                    () => {
                                        navigate("/changelocation");
                                    }
                                }></div>
                            </div>
                            <div className="current-location-label-container">
                                <img src={currentlocationicon} alt="current-location" />
                                <h2>{localStorage.getItem("currentLocation")}</h2>
                            </div>
                            <div className="current-report-container">
                                <div className="current-temprature-container">
                                    <div className="min-max-temp-container">
                                        <p>Min</p>
                                        <p>{state.report.Daily[0].minTemp}<sup>.</sup>C</p>
                                    </div>
                                    <div className="avgtemp-container">
                                        <p>{state.report.Current.temperature}<sup>.</sup>C</p>
                                        <p>{state.report.Current.symbolPhrase}</p>
                                    </div>
                                    <div className="min-max-temp-container">
                                        <p>Max</p>
                                        <p>{state.report.Daily[0].maxTemp}<sup>.</sup>C</p>
                                    </div>
                                </div>
                                <div className="sunriseandset-container">
                                    <div className="sun-rise-set-container">
                                        <p>SUN RISE</p>
                                        <img src={sunrise} alt="sunrise" />
                                        <p>{(state.report.Daily[0].sunrise).substring(0, 5)}</p>
                                    </div>
                                    <div className="sun-rise-set-container">
                                        <p>SUN SET</p>
                                        <img src={sunset} alt="sunset" />
                                        <p>{(state.report.Daily[0].sunset).substring(0, 5)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="other-report-container">
                                <div className="other-report-block">
                                    <div className="other-reports">
                                        <div className="humidity-icon"></div>
                                        <h3>{state.report.Current.relHumidity}%</h3>
                                        <p>Humidity</p>
                                    </div>
                                    <div className="other-reports">
                                        <div className="windspeed-icon"></div>
                                        <h3>{state.report.Current.windSpeed}KM/H</h3>
                                        <p>Wind Speed</p>
                                    </div>
                                </div>
                                <div className="other-report-block">
                                    <div className="other-reports">
                                        <div className="cloudiness-icon"></div>
                                        <h3>{state.report.Current.cloudiness}%</h3>
                                        <p>Cloudiness</p>
                                    </div>
                                    <div className="other-reports">
                                        <div className="uvindex-icon"></div>
                                        <h3>{state.report.Current.uvIndex}</h3>
                                        <p>UV Index</p>
                                    </div>
                                </div>
                                <div className="other-report-block">
                                    <div className="other-reports">
                                        <div className="rainprob-icon"></div>
                                        <h3>{state.report.Current.precipProb}%</h3>
                                        <p>Rain Prob.</p>
                                    </div>
                                    <div className="other-reports">
                                        <div className="pressure-icon"></div>
                                        <h3>{parseInt(state.report.Current.pressure)}mbar</h3>
                                        <p>Pressure</p>
                                    </div>
                                </div>
                            </div>
                            <h1>Upcoming Hours</h1>
                            <div className="upcoming-hours-container">
                                {
                                    state.report.Hourly && state.report.Hourly.length && state.report.Hourly.map((tempDaily, index) => {
                                            function renderImage(param){
                                            switch (param.replace(' ','')) {
                                                case "clear":
                                                    return(
                                                        <img src={clear} className="hourly-container-symbol" alt="symbol" />
                                                    )
                                                case "mostlyclear":
                                                    return(
                                                        <img src={mostlyclear} className="hourly-container-symbol" alt="symbol" />
                                                    )
                                                case "overcast":
                                                    return(
                                                        <img src={overcast} className="hourly-container-symbol" alt="symbol" />
                                                    )
                                                case "partlycloudy":
                                                    return(
                                                       <img src={partlycloudy} className="hourly-container-symbol" alt="symbol" />
                                                    )
                                                case "cloudy":
                                                    return(
                                                        <img src={cloudy} className="hourly-container-symbol" alt="symbol" />
                                                    )
                                                case "lightrain":
                                                    return(
                                                        <img src={lightrain} className="hourly-container-symbol" alt="symbol" />
                                                    )
                                                case "showers":
                                                    return(
                                                        <img src={showers} className="hourly-container-symbol" alt="symbol" />
                                                    )
                                                case "rain":
                                                    return(
                                                        <img src={rain} className="hourly-container-symbol" alt="symbol" />
                                                    )
                                                case "thunderstorms":
                                                    return(
                                                        <img src={thunderstorms} className="hourly-container-symbol" alt="symbol" />
                                                    )
                                                default:
                                                    break;
                                            }
                                        }
                                        return (
                                            <div className="hourly-container">
                                                <h3>{date.format(date.addHours(new Date(),index),'hh:mm A')}</h3>
                                                {renderImage(tempDaily.symbolPhrase)}
                                                <h2>{tempDaily.temperature}<sup>.</sup>C</h2>
                                                <h4>{tempDaily.windSpeed}KM/H</h4>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <h1>Upcoming Days</h1>
                            <div className="upcoming-days-container">
                                <div className="days-report-block">
                                    <div className="days-report">
                                        <div className="days-report-row1">
                                            <h3>|{date.format(date.addDays(new Date(),1),'DD-MM-YYYY')}</h3>
                                            <h3>{state.report.Daily[1].symbolPhrase}</h3>
                                        </div>
                                        <div className="days-report-row2">
                                            <h1>{state.report.Daily[1].minTemp}<sup>.</sup>C / {state.report.Daily[1].maxTemp}<sup>.</sup>C</h1>
                                        </div>
                                        <div className="days-report-row3">
                                            <div>
                                                <img src={wind} className="dayicons" alt="wind" />
                                                <h4>{state.report.Daily[1].maxWindSpeed}KM/H</h4>
                                            </div>
                                            <div>
                                                <img src={rainprob} className="dayicons" alt="rainprob" />
                                                <h4>{state.report.Daily[1].precipProb}%</h4>
                                            </div>
                                            <div>
                                                <img src={uvindex} className="dayicons" alt="uvindex" />
                                                <h4>{state.report.Daily[1].uvIndex}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="days-report">
                                        <div className="days-report-row1">
                                            <h3>|{date.format(date.addDays(new Date(),2),'DD-MM-YYYY')}</h3>
                                            <h3>{state.report.Daily[2].symbolPhrase}</h3>
                                        </div>
                                        <div className="days-report-row2">
                                            <h1>{state.report.Daily[2].minTemp}<sup>.</sup>C / {state.report.Daily[2].maxTemp}<sup>.</sup>C</h1>
                                        </div>
                                        <div className="days-report-row3">
                                            <div>
                                                <img src={wind} className="dayicons" alt="wind" />
                                                <h4>{state.report.Daily[2].maxWindSpeed}KM/H</h4>
                                            </div>
                                            <div>
                                                <img src={rainprob} className="dayicons" alt="rainprob" />
                                                <h4>{state.report.Daily[2].precipProb}%</h4>
                                            </div>
                                            <div>
                                                <img src={uvindex} className="dayicons" alt="uvindex" />
                                                <h4>{state.report.Daily[2].uvIndex}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="days-report-block">
                                    <div className="days-report">
                                        <div className="days-report-row1">
                                            <h3>|{date.format(date.addDays(new Date(),3),'DD-MM-YYYY')}</h3>
                                            <h3>{state.report.Daily[3].symbolPhrase}</h3>
                                        </div>
                                        <div className="days-report-row2">
                                            <h1>{state.report.Daily[3].minTemp}<sup>.</sup>C / {state.report.Daily[3].maxTemp}<sup>.</sup>C</h1>
                                        </div>
                                        <div className="days-report-row3">
                                            <div>
                                                <img src={wind} className="dayicons" alt="wind" />
                                                <h4>{state.report.Daily[3].maxWindSpeed}KM/H</h4>
                                            </div>
                                            <div>
                                                <img src={rainprob} className="dayicons" alt="rainprob" />
                                                <h4>{state.report.Daily[3].precipProb}%</h4>
                                            </div>
                                            <div>
                                                <img src={uvindex} className="dayicons" alt="uvindex" />
                                                <h4>{state.report.Daily[3].uvIndex}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="days-report">
                                        <div className="days-report-row1">
                                            <h3>|{date.format(date.addDays(new Date(),4),'DD-MM-YYYY')}</h3>
                                            <h3>{state.report.Daily[4].symbolPhrase}</h3>
                                        </div>
                                        <div className="days-report-row2">
                                            <h1>{state.report.Daily[4].minTemp}<sup>.</sup>C / {state.report.Daily[4].maxTemp}<sup>.</sup>C</h1>
                                        </div>
                                        <div className="days-report-row3">
                                            <div>
                                                <img src={wind} className="dayicons" alt="wind" />
                                                <h4>{state.report.Daily[4].maxWindSpeed}KM/H</h4>
                                            </div>
                                            <div>
                                                <img src={rainprob} className="dayicons" alt="rainprob" />
                                                <h4>{state.report.Daily[4].precipProb}%</h4>
                                            </div>
                                            <div>
                                                <img src={uvindex} className="dayicons" alt="uvindex" />
                                                <h4>{state.report.Daily[4].uvIndex}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="days-report-block">
                                    <div className="days-report">
                                        <div className="days-report-row1">
                                            <h3>|{date.format(date.addDays(new Date(),5),'DD-MM-YYYY')}</h3>
                                            <h3>{state.report.Daily[5].symbolPhrase}</h3>
                                        </div>
                                        <div className="days-report-row2">
                                            <h1>{state.report.Daily[5].minTemp}<sup>.</sup>C / {state.report.Daily[5].maxTemp}<sup>.</sup>C</h1>
                                        </div>
                                        <div className="days-report-row3">
                                            <div>
                                                <img src={wind} className="dayicons" alt="wind" />
                                                <h4>{state.report.Daily[5].maxWindSpeed}KM/H</h4>
                                            </div>
                                            <div>
                                                <img src={rainprob} className="dayicons" alt="rainprob" />
                                                <h4>{state.report.Daily[5].precipProb}%</h4>
                                            </div>
                                            <div>
                                                <img src={uvindex} className="dayicons" alt="uvindex" />
                                                <h4>{state.report.Daily[5].uvIndex}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="days-report">
                                        <div className="days-report-row1">
                                            <h3>|{date.format(date.addDays(new Date(),6),'DD-MM-YYYY')}</h3>
                                            <h3>{state.report.Daily[6].symbolPhrase}</h3>
                                        </div>
                                        <div className="days-report-row2">
                                            <h1>{state.report.Daily[6].minTemp}<sup>.</sup>C / {state.report.Daily[6].maxTemp}<sup>.</sup>C</h1>
                                        </div>
                                        <div className="days-report-row3">
                                            <div>
                                                <img src={wind} className="dayicons" alt="wind" />
                                                <h4>{state.report.Daily[6].maxWindSpeed}KM/H</h4>
                                            </div>
                                            <div>
                                                <img src={rainprob} className="dayicons" alt="rainprob" />
                                                <h4>{state.report.Daily[6].precipProb}%</h4>
                                            </div>
                                            <div>
                                                <img src={uvindex} className="dayicons" alt="uvindex" />
                                                <h4>{state.report.Daily[6].uvIndex}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>

    )
}
export default WeatherReport;