import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { render } from "react-dom";
import YoutubeVidePlayer from "./routes/YoutubeVidePlayer";
import ReactGA from 'react-ga';


ReactGA.initialize('G-SMJE6TQRLV');
ReactGA.pageview(window.location.pathname + window.location.search);

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/one/ytroll/:videoId" element={<YoutubeVidePlayer />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
