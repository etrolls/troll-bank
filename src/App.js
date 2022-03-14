import './App.scss';
import { Container, Tooltip, Card, Row, Col, CardGroup, OverlayTrigger, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { Rings } from 'react-loader-spinner';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Fuse from 'fuse.js';
import VideoModel from './models/video-model/VideoModel';
import AnimatedButton from "./animatedButtons/AnimatedButton";

function App() {

  /** Bootstrap popup boolean state const */
  const [videoShowModel, setVideoShowModel] = useState(false);


  /** State store the selected troll */
  const [selectedtroll, setSelectedtroll] = useState({});

  /** items is the main one to store the api result & filttereed items will read data from items and store the state const */
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  /**  No of videos to be displayed on the screen is controlled by state const and showMoreItems will handle user scroll  and populate more results  */
  const [visbility, setVisibility] = useState(15);
  const showMoreItems = () => {
    setVisibility((preValue) => preValue + 15);
  };

  /** state that store boolean value for Loading spinner which activite before computing the fuse result from items   */
  const [isLoading, setIsLoading] = useState(false);

  /** options are auto suggestion result in the search dropdown, All these values are stored in the state */
  const [options, setOptions] = useState([]);

  /**filter by is a boolean to allow AsyncTypeahead to activiate filter capability  */
  const filterBy = () => true;

  /** API to fetch all records from our DB  */
  useEffect(() => {
    fetch('https://api.etrolls.in/youtube/data/allRecords.json')
      .then(response => response.json())
      .then((data) => { setItems(data); setFilteredItems(data); })
  }, [])

  /**It performs something the same as full-text search against data to see likely misspellings and approximate string matching.  */
  const fuse = new Fuse(items, {
    keys: ['dialog', 'tags']
  })

  /** const handler  to feed the auto suggestion data  */
  const handleSearch = (query) => {
    setIsLoading(true);
    const data = fuse.search(query).map((i) => ({
      dialog: i.item.dialog,
      id: i.item.id,
      tags: i.item.tags,
      videoId: i.item.videoId
    }));
    setOptions(data);
    setIsLoading(false);
  };

  /** const handler to retain filtered result in same state until the final selection is done from the autosuggestions   */
  const handleInputChange = () => {
    setFilteredItems(items);
  }

  /** const handler to feed the auto suggestion data in to the filtered results */
  const handleChange = (selectedOptions) => {
    if (Object.keys(selectedOptions).length !== 0) {
      setFilteredItems(selectedOptions);
    } else {
      setFilteredItems(items);
    }

  }

  return (
    <>
      <div className="d-none d-md-block d-lg-block d-xl-block" ><AnimatedButton /></div>
      <footer className="d-sm-block d-xs-block d-lg-none d-md-none d-xl-none mAnimatedButton" ><AnimatedButton /></footer >
      <VideoModel
        input={selectedtroll}
        show={videoShowModel}
        onHide={() => { setSelectedtroll({}); setVideoShowModel(false); }}
      />
      <Container className="mx-auto">
        <header>
          <h1 className="text-center fontweight">TROLL BANK</h1>
          <h6 className="text-center subTitle">View, Download, Upload , Store</h6>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <center>
                <div id="divContainer" className="mx-auto">
                  <AsyncTypeahead
                    filterBy={filterBy}
                    id="async-example"
                    isLoading={isLoading}
                    labelKey="dialog"
                    minLength={2}
                    onSearch={handleSearch}
                    options={options}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    placeholder=" 🔍 Search for your favorite item........."
                    renderMenuItemChildren={(option) => (
                      <>
                        <Row>
                          <Col>
                            <img
                              alt={option.dialog}
                              src={"https://i.ytimg.com/vi/" + option.videoId + "/hqdefault.jpg"}
                              style={{
                                height: '24px',
                                marginRight: '10px',
                                width: '24px',
                              }}
                            />
                          </Col>
                          <Col>{option.dialog}</Col>
                        </Row>
                      </>
                    )}
                  />
                </div>
              </center>
            </Col>
          </Row>
        </header>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
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
              className="mt-n1"
            >
              <Container>
                <CardGroup>
                  {filteredItems.map((i, idx) => (
                    <Col key={(Math.random() + 1).toString(36).substring(7) + "-" + idx} id={(Math.random() + 1).toString(36).substring(7) + "-" + idx} xs={12} sm={12} md={4} lg={3} className="p-3">
                      <Card className="d-flex align-items-stretch" key={"card-" + idx} id={"card-" + idx}>
                        <a href="/#" onClick={() => {
                          setSelectedtroll(i);
                          setVideoShowModel(true);
                        }} key={"anchor-" + idx} id={"anchor-" + idx} className="stretched-link">
                          <div className="videoContainer">
                            <img id={"playbutton-" + idx} key={"playbutton-" + idx} src="/img/YouTube_play_button_icon.svg" alt="play" className="playBtn" />
                            <Card.Img id={"cardImg-" + idx} key={"cardImg-" + idx} variant="top" src={"https://i.ytimg.com/vi/" + i.videoId + "/hqdefault.jpg"} />
                          </div>
                        </a>

                        <Card.Body key={"cardbody-" + idx} id={"cardbody-" + idx} >
                          <center>
                            <OverlayTrigger
                              key={"top"}
                              placement={"top"}
                              overlay={
                                <Tooltip id={`tooltip-right`}>
                                  {i.dialog}
                                </Tooltip>
                              }
                            >
                              <Card.Title key={"cardTitle-" + idx} id={"cardTitle-" + idx} >{i.dialog}</Card.Title>
                            </OverlayTrigger>
                          </center>
                          <center>
                            {i.tags.split(" ").map((t, idx) => (
                              <Card.Text key={"#tags-" + idx} id={"#tags-" + idx} className="w3-tag m-1">{"#" + t}</Card.Text>
                            ))}
                          </center>
                        </Card.Body>
                        <Button key={"contentDwnBtn-" + idx} id={"contentDwnBtn-" + idx} variant="primary" onClick={() => {
                          setSelectedtroll(i);
                          setVideoShowModel(true);
                        }}>
                          Download Audio/ Video File
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </CardGroup>
              </Container>
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    </>
  );
}



export default App;
