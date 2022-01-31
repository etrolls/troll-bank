import './App.css';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import ReactGA from 'react-ga';
import { Rings } from 'react-loader-spinner'



function App() {
  ReactGA.initialize('G-SMJE6TQRLV');

  const [items, setItems] = useState([]);

  const [visbility, setVisibility] = useState(15);

  const [searchField, setSearchField] = useState("");

  const [filteredItems, setFilteredItems] = useState([]);

  const showMoreItems = () => {
    setVisibility((preValue) => preValue + 15);
  };

  useEffect(() => {
    fetch('https://api.etrolls.in/youtube/data/getAllRecords.json')
      .then(response => response.json())
      .then((data) => { setItems(data); setFilteredItems(data); })
  }, [])

  useEffect(() => {
    setFilteredItems(items.filter(
      record => {
        if (searchField.toLowerCase() === "") {
          return record;
        } else {
          return (
            record.tags.toLowerCase().split(" ").some(r => searchField.toLowerCase().split(" ").includes(r)) ||
            record.dialog.toLowerCase().split(" ").some(r => searchField.toLowerCase().split(" ").includes(r))
          );
        }
      }

    ));
  }, [searchField, items]);

  const handleChange = e => {
    setSearchField(e.target.value);
    console.log(searchField);
  };

  return (
    <>
      <center className="sticky">
        <div className="logo" >TROLL BANK</div>
        <p>View, Download, Upload , Store</p>
        <div className="bar">
          <img alt="Search" className="lens" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Google_Magnifying_Glass.svg/480px-Google_Magnifying_Glass.svg.png" title="Search by Voice" />
          <input className="searchbar" onChange={handleChange} />
          <img alt="Search by Voice" className="voice" src="https://seeklogo.com/images/G/google-mic-logo-EF440C9A6F-seeklogo.com.png" title="Search by Voice" />
        </div>
      </center>
      <div className="content">
        <InfiniteScroll
          dataLength={visbility}
          next={showMoreItems}
          hasMore={true}
          loader={<div className="inline"> <div><Rings
            heigth="100"
            width="100"
            ariaLabel='loading'
            color="#FF6347"
          /></div> <div className="inline">Fetching more results from  Youtube & Instagram ........</div></div>}
        >
          <div className="container con ">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mobDown">
              {filteredItems.map((i, index) => (
                <>
                  <div id={"card-0" + index} key={"card-0" + index} className="card">
                    <iframe id={"frame-0" + index} key={"frame-0" + index} loading="lazy" srcDoc={"<style> * { padding: 0; margin: 0; overflow: hidden; } body, html { height: 100%; } img, svg { position: absolute; width: 100%; top: 0; bottom: 0; margin: auto; } svg { filter: drop-shadow(1px 1px 10px hsl(206.5, 70.7%, 8%)); transition: all 250ms ease-in-out; } body:hover svg { filter: drop-shadow(1px 1px 10px hsl(206.5, 0%, 10%)); transform: scale(1.2); } </style> <a href='https://www.youtube.com/embed/" + i.id + "?autoplay=1'> <img src='https://img.youtube.com/vi/" + i.id + "/hqdefault.jpg' alt='Coffee Recipe Javascript Project'> <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play-circle'><circle cx='12' cy='12' r='10'></circle><polygon points='10 8 16 12 10 16 10 8'></polygon></svg> </a> "} src={"https://www.youtube.com/embed/" + i.id} title="Coffee Recipe Javascript Project" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen> </iframe>
                    <div id={"cardbody-0" + index} key={"cardbody-0" + index} className="card-body">
                      <h5 id={"cardTitle-0" + index} key={"cardTitle-0" + index} className="text-center card-title">{i.dialog}</h5>
                      <p id={"tag" + index} key={"tag" + index} className="text-center">
                        &nbsp;  &nbsp;
                        {i.tags.split(" ").map((eachTag, ind) => <span id={"tags-0" + ind} key={"tags-0" + ind} className="w3-tag">{eachTag}</span>)}
                        &nbsp;
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>

  );
}

export default App;
