import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import ReactGA from 'react-ga';

export default function YoutubeVidePlayer() {
    localStorage.setItem('yId', useParams().videoId); 
    ReactGA.initialize('G-SMJE6TQRLV');
    const [items, setItems] = useState({});
    const [filteredItems, setFilteredItems] = useState({});
    useEffect((params) => {
        fetch('https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=' + localStorage.getItem('yId'))
            .then(response => response.json())
            .then((data) => { setItems(data); setFilteredItems(data); })
    }, [])
    useEffect(() => { setFilteredItems(items) }, [items]);
    console.log(filteredItems); 
    return (<>
        <a href="/" ><center className="sticky">
            <div className="logo" >TROLL BANK</div>
            <p>View, Download, Upload , Store</p>
            <div className="bar">
                <img alt="Search" className="lens" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Google_Magnifying_Glass.svg/480px-Google_Magnifying_Glass.svg.png" title="Search by Voice" />
                <input className="searchbar" />
                <img alt="Search by Voice" className="voice" src="https://seeklogo.com/images/G/google-mic-logo-EF440C9A6F-seeklogo.com.png" title="Search by Voice" />
            </div>
        </center></a>
        <center>
            <h2 className="main-title fw-bold">{filteredItems.title}</h2>
            <p className="text-center"></p>
            <iframe key="1" title={localStorage.getItem('yId')} width="420" height="345" src={"https://www.youtube.com/embed/" + localStorage.getItem('yId') + "?autoplay=1&controls=0&mute=1"} />
        </center>
    </>);
}
