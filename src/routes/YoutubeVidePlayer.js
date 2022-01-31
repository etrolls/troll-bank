import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import ReactGA from 'react-ga';

export default function YoutubeVidePlayer() {
    const params = useParams();
    ReactGA.initialize('G-SMJE6TQRLV');
    const [items, setItems] = useState({});
    const [filteredItems, setFilteredItems] = useState({});
    useEffect(() => {
        fetch('https://ap-south-1.aws.data.mongodb-api.com/app/troll-bank-web-app-phlnx/endpoint/movies?arg=' + params.videoId)
            .then(response => response.json())
            .then((data) => { setItems(data); setFilteredItems(data); })
    }, [])
    useEffect(() => { setFilteredItems(items) });
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
            <h2 className="main-title fw-bold">{filteredItems.dialog}</h2>
            <p className="text-center"></p>
            <iframe width="420" height="345" src={"https://www.youtube.com/embed/" + params.videoId + "?autoplay=1&controls=0&mute=1"} />
        </center>
    </>);
}
