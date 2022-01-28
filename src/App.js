import './App.css';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

function App() {

  const [items, setItems] = useState([]);
  const [visbility, setVisibility] = useState(6);
  const [searchField, setSearchField] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const showMoreItems = () => {
    setVisibility((preValue) => preValue + 3);
  };


  useEffect(() => {
    fetch('https://raw.githubusercontent.com/gskoushik/api/main/realData.json')
      .then(response => response.json())
      .then((data) => { setItems(data); setFilteredItems(data); })
  }, [])

  console.log(items);

  useEffect(() => {
    setFilteredItems(items.filter(
      record => {
        return (
          record
            .tags
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
          record
            .dialog
            .toLowerCase()
            .includes(searchField.toLowerCase())
        );
      }
    ));
  }, [searchField, items]);

  const handleChange = e => {
    setSearchField(e.target.value);
    console.log(searchField);
  };

  return (
    <>
      <nav className="nv navbar navbar-expand-md navbar-light fixed-top bg-light">
        <div className="container-fluid">
          <div className="navbar-brand" href="#">TITLE</div>
        </div>
      </nav>
      <div className="container-fluid search fixed-top bg-light">
        <div className="bar ">
          <input className="searchbar" type="text" title="Search" onChange={handleChange} />
          <img className="voice" alt="mike" src="https://www.freepngimg.com/thumb/microphone/70666-voice-microphone-google-search-logo-png-file-hd-thumb.png" title="Search by Voice" />
        </div>
      </div>
      <InfiniteScroll
        dataLength={visbility}
        next={showMoreItems}
        hasMore={true}
        loader={<h4>Search......</h4>}
      >
        <div className="container con bg-light">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
            {
              (() => {
                if (searchField === '' || searchField.length === 0) {
                  return (
                    <>
                      {items.slice(0, visbility).map((i, index) => (
                        <>
                          <div key={index} className="card">
                            <iframe loading="lazy" srcdoc={"<style> * { padding: 0; margin: 0; overflow: hidden; } body, html { height: 100%; } img, svg { position: absolute; width: 100%; top: 0; bottom: 0; margin: auto; } svg { filter: drop-shadow(1px 1px 10px hsl(206.5, 70.7%, 8%)); transition: all 250ms ease-in-out; } body:hover svg { filter: drop-shadow(1px 1px 10px hsl(206.5, 0%, 10%)); transform: scale(1.2); } </style> <a href='https://www.youtube.com/embed/"+i.id+"?autoplay=1'> <img src='https://img.youtube.com/vi/"+i.id+"/hqdefault.jpg' alt='Coffee Recipe Javascript Project'> <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play-circle'><circle cx='12' cy='12' r='10'></circle><polygon points='10 8 16 12 10 16 10 8'></polygon></svg> </a> "} src={"https://www.youtube.com/embed/"+i.id} title="Coffee Recipe Javascript Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>
                            <div className="card-body">
                              <h5 className="text-center card-title">{i.dialog}</h5>
                              <p className="text-center">
                                &nbsp;  &nbsp;
                                {i.tags.split(" ").map((eachTag) => <span className="w3-tag">{eachTag}</span>)}
                                &nbsp;
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  )
                } else {
                  return (
                    <>
                      {filteredItems.map((i, index) => (
                        <>
                          <div key={index} className="card">
                            <iframe loading="lazy" srcdoc={"<style> * { padding: 0; margin: 0; overflow: hidden; } body, html { height: 100%; } img, svg { position: absolute; width: 100%; top: 0; bottom: 0; margin: auto; } svg { filter: drop-shadow(1px 1px 10px hsl(206.5, 70.7%, 8%)); transition: all 250ms ease-in-out; } body:hover svg { filter: drop-shadow(1px 1px 10px hsl(206.5, 0%, 10%)); transform: scale(1.2); } </style> <a href='https://www.youtube.com/embed/"+i.id+"?autoplay=1'> <img src='https://img.youtube.com/vi/"+i.id+"/hqdefault.jpg' alt='Coffee Recipe Javascript Project'> <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play-circle'><circle cx='12' cy='12' r='10'></circle><polygon points='10 8 16 12 10 16 10 8'></polygon></svg> </a> "} src={"https://www.youtube.com/embed/"+i.id} title="Coffee Recipe Javascript Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>
                            <div className="card-body">
                              <h5 className="text-center card-title">{i.dialog}</h5>
                              <p className="text-center">
                                &nbsp;  &nbsp;
                                {i.tags.split(" ").map((eachTag) => <span className="w3-tag">{eachTag}</span>)}
                                &nbsp;
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  )
                }
              })()
            }
          </div>
        </div>

      </InfiniteScroll>
    </>

  );
}

export default App;
