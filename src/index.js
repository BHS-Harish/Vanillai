import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./redux/Store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import App from './App';
import GetStarted from './components/GetStarted';
import LocationError from './components/LocationError';
import ChangeLocation from './components/ChangeLocation';
import WeatherReport from './components/WeatherReport';
import Error404 from './components/Error404';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:<Error404/>
  },
  {
    path:"getstarted",
    element:<GetStarted/>,
    errorElement:<Error404/>
  },
  {
    path:"locationerror",
    element:<LocationError/>,
    errorElement:<Error404/>
  },
  {
    path:"changelocation",
    element:<ChangeLocation/>,
    errorElement:<Error404/>
  },
  {
    path:"weatherreport",
    element:<WeatherReport/>,
    errorElement:<Error404/>,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
