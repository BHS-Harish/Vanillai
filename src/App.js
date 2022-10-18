import React, { useState} from 'react';
import Loader from './components/Loader';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {

  const[loading,setLoading]=useState(true);
  const navigate=useNavigate();
  setTimeout(function(){
    setLoading(false);
  },3000);

  return (
    <>
      {
        loading?<Loader/>:
        localStorage.getItem("currentLocation") && localStorage.getItem("currentLocationId") && localStorage.getItem("currentLocationId").length ?
        navigate("/weatherreport")
        :
        navigate("/getstarted")
      }
    </>
  )
}

export default App;
