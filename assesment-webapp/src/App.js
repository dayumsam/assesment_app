import React, { useState } from "react";
import axios from 'axios';

import Login from "./pages/auth/login"
import Test from "./pages/test/test"
import Header from "./components/header/header"

import './sass/app.scss';

import 'bootstrap/dist/css/bootstrap.min.css'

const storedJwt = localStorage.getItem('token');

const apiUrl = 'http://localhost:1337/';

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function App() {
  let [isLogged, setIsLogged] = useState(storedJwt ? true : false);

  return (
    <div className="App">
        {isLogged ?
        <>
          <Header setLogin={setIsLogged}/>
          <Test/> 
        </> : 
        <Login storedJwt={storedJwt} setLogin={setIsLogged}/>}
    </div>
  );
}

export default App;
