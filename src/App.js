import './App.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InfiniteScroll from "react-infinite-scroll-component";
import { Rings } from 'react-loader-spinner';
import CardGroup from 'react-bootstrap/CardGroup';
import YouTubeSubscribe from "./youtubeSubscribe";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Fuse from 'fuse.js';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Upload } from 'react-bootstrap-icons';


var onetroll = "";

function App() {

  /** Bootstrap popup boolean state const */
  const [videoShowModel, setVideoShowModel] = useState(false);
  const [AddVideoModel, setAddVideoModel] = useState(false);


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
  const handleInputChange = (input, e) => {
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
    <Container fluid>
      <a href="/#" onClick={() => {
        setAddVideoModel(true);
      }} key={"AddVideoPopup"} id={"AddVideoPopup"}>
        <div class="icon-bar button-container">
          <div class="glass-btn red-btn ">
            <img src="https://i.postimg.cc/LstJ4Hhf/youtube.png" alt="youtube" />
          </div>
        </div>
        <div class="icon-bar bottom-left">ADD VIDEO</div>
      </a>
      <Container className="p-3">
        <h1 className="text-center fontweight">TROLL BANK</h1>
        <h6 className="text-center subTitle">View, Download, Upload , Store</h6>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <center>
              <div className="mx-auto">
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
                          onetroll = i;
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


                        <>
                          <Button key={"contentDwnBtn-" + idx} id={"contentDwnBtn-" + idx} variant="primary" onClick={() => {
                            onetroll = i;
                            setVideoShowModel(true);
                          }}>
                            Download Audio/ Video File
                          </Button>
                        </>
                      </Card>
                    </Col>
                  ))}
                </CardGroup>
              </Container>
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
      <MyVerticallyCenteredModal
        show={videoShowModel}
        onHide={() => { setVideoShowModel(false); }}
      />
      <AddVideoModal
        show={AddVideoModel}
        onHide={() => { setAddVideoModel(false); }}
      />
    </Container>
  );
}

function MyVerticallyCenteredModal(props) {
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("highest");
  if (Object.keys(onetroll).length !== 0) {
    fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + onetroll.videoId + '&key=' + process.env.REACT_APP_YOUTUBE_API_KEY)
      .then(response => response.json())
      .then((data) => {
        window.localStorage.setItem('youtube-user-id', data.items[0].snippet.channelId);
      });
  }
  async function closeWindow(url) {
    props.onHide();
    window.open(url,
      "mywindow", "width=150,height=150");
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {onetroll.dialog}
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <Container className="d-none d-md-block d-lg-block d-xl-block">
          <Row>
            <Col xs={7} sm={7} md={7} lg={7} className="p-3" >
              <div className="embed-responsive embed-responsive-16by9 ">
                <iframe title={onetroll.videoId} className="embed-responsive-item" frameBorder="1" src={"https://www.youtube.com/embed/" + onetroll.videoId + "?autoplay=1"} ></iframe>
              </div>
            </Col>
            <Col xs={5} sm={5} md={5} lg={5} className="p-1" >
              <Row xs={12} sm={12} md={12} lg={12} className="p-2">
                <YouTubeSubscribe
                  channelid={onetroll.yId}
                  theme={"default"}
                  layout={"full"}
                  count={"default"}
                />
              </Row>
              <Row xs={12} sm={12} md={12} lg={12} className="p-3">
                <label className="text-left">Format </label>
                <select name="format" id="format" onChange={(e) => { setFormat(e.target.value) }}>
                  <optgroup label="Video">
                    <option>mp4</option>
                    <option>mov</option>
                    <option>avi</option>
                    <option>webm</option>
                    <option>mkv</option>
                    <option>flv</option>
                  </optgroup>
                  <optgroup label="Audio">
                    <option>mp3</option>
                    <option>wav</option>
                    <option>wmv</option>
                    <option>ogg</option>
                    <option>aiff</option>
                  </optgroup>
                </select>
              </Row>
              <Row xs={12} sm={12} md={12} lg={12} className="p-3">
                <label className="text-left" >Quality </label>
                <select name="quality" id="quality" onChange={(e) => { setQuality(e.target.value) }}>
                  <optgroup label="Audio and video">
                    <option>Highest quality</option>
                    <option>Lowest quality</option>
                  </optgroup>
                  <optgroup label="Audio only">
                    <option>Highest audio quality</option>
                    <option>Lowest audio quality</option>
                  </optgroup>
                  <optgroup label="Video only">
                    <option>Highest video quality</option>
                    <option>Lowest video quality</option>
                  </optgroup>
                </select>
              </Row>
              <Row xs={12} sm={12} md={12} lg={12} className="p-3">
                <Button onClick={() => { closeWindow("https://zvemy.sse.codesandbox.io/download?URL=https://www.youtube.com/watch?v=" + onetroll.videoId + "&format=" + format + "&quality=" + quality, "_blank", 'newwindow') }} >Download & Close Popup</Button>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container className="d-sm-block d-xs-block d-lg-none d-md-none d-xl-none">
          <Row>
            <Col xs={8} sm={8} className="text-end" >
              <Row xs={12} sm={12} className="text-end">
                <label >Format </label>
                <select name="format" id="format" onChange={(e) => { setFormat(e.target.value) }}>
                  <optgroup label="Video">
                    <option>mp4</option>
                    <option>mov</option>
                    <option>avi</option>
                    <option>webm</option>
                    <option>mkv</option>
                    <option>flv</option>
                  </optgroup>
                  <optgroup label="Audio">
                    <option>mp3</option>
                    <option>wav</option>
                    <option>wmv</option>
                    <option>ogg</option>
                    <option>aiff</option>
                  </optgroup>
                </select>
              </Row>
              <Row xs={12} sm={12} className="text-end">
                <label  >Quality </label>
                <select name="quality" id="quality" onChange={(e) => { setQuality(e.target.value) }}>
                  <optgroup label="Audio and video">
                    <option>Highest quality</option>
                    <option>Lowest quality</option>
                  </optgroup>
                  <optgroup label="Audio only">
                    <option>Highest audio quality</option>
                    <option>Lowest audio quality</option>
                  </optgroup>
                  <optgroup label="Video only">
                    <option>Highest video quality</option>
                    <option>Lowest video quality</option>
                  </optgroup>
                </select>
              </Row>
            </Col>
            <Col xs={4} sm={4} className="text-start adjustingvm" >
              <YouTubeSubscribe
                channelid={window.localStorage.getItem('youtube-user-id')}
                theme={"default"}
                layout={"full"}
                count={"default"}
              />
            </Col>
          </Row>

          <center>
            <div className="embed-responsive embed-responsive-16by9 ">
              <iframe title={onetroll.videoId} className="embed-responsive-item" src={"https://www.youtube.com/embed/" + onetroll.videoId + "?autoplay=1"} ></iframe>
            </div>
          </center>
        </Container>
      </Modal.Body>
      <Button className="d-sm-block d-xs-block d-lg-none d-md-none d-xl-none" onClick={() => { closeWindow("https://zvemy.sse.codesandbox.io/download?URL=https://www.youtube.com/watch?v=" + onetroll.videoId + "&format=" + format + "&quality=" + quality, "_blank") }} >Download & Close Popup</Button>
    </Modal>
  );
}


function AddVideoModal(props) {
  const [response, setResponse] = useState("");

  function createdRecordAndSetResponseHeader() {
    setResponse("video uploaded successfully");
    setTimeout(() => { setResponse(""); props.onHide(); }, 2000);

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Video  &nbsp; <Upload /> &nbsp;
          <span className="alert font-weight-success">{response}</span>
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <Button onClick={() => { createdRecordAndSetResponseHeader() }} >Download & Close Popup</Button>
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Modal.Body>

    </Modal>
  );
}

export default App;
