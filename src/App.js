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


var onetroll = "";

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [items, setItems] = useState([]);
  const [visbility, setVisibility] = useState(15);
  const [searchField, setSearchField] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const showMoreItems = () => {
    setVisibility((preValue) => preValue + 15);
  };

  useEffect(() => {
    fetch('https://api.etrolls.in/youtube/data/1.json')
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

  (function () {
    var cx = '843f7adc740834ca9';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();

  useEffect(() => {

  }, []);

  window.onload = function () {
    document.getElementById('gsc-i-id1').placeholder = 'SEARCH FOR FAVOURITE TROLL';
  };

  return (
    <>
      <Container className="p-3">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <div className="mx-auto">
              <div data-text="Enter text here" className="gcse-search" ></div>
            </div>
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
                  <Row>
                    {filteredItems.map((i, idx) => (
                      <Col key={(Math.random() + 1).toString(36).substring(7) + "-" + idx} id={(Math.random() + 1).toString(36).substring(7) + "-" + idx} xs={12} sm={12} md={4} lg={3} className="p-3">
                        <Card className="d-flex align-items-stretch" key={"card-" + idx} id={"card-" + idx}>
                          <a href="/#" onClick={() => {
                            onetroll = i;
                            setModalShow(true);
                          }} key={"anchor-" + idx} id={"anchor-" + idx} className="stretched-link">
                            <div className="videoContainer">
                              <img id={"playbutton-" + idx} key={"playbutton-" + idx} src="/img/YouTube_play_button_icon.svg" alt="play" className="playBtn" />
                              <Card.Img id={"cardImg-" + idx} key={"cardImg-" + idx} variant="top" src={"https://i.ytimg.com/vi/" + i.videoId + "/hqdefault.jpg"} />
                            </div>
                          </a>
                          <Card.Body key={"cardbody-" + idx} id={"cardbody-" + idx} >
                            <center>
                              <Card.Title key={"cardTitle-" + idx} id={"cardTitle-" + idx} >{i.dialog}</Card.Title>
                            </center>
                            <center>
                              {i.tags.map((t, idx) => (
                                <Card.Text key={"#tags-" + idx} id={"#tags-" + idx} className="w3-tag m-1">{t}</Card.Text>
                              ))}
                            </center>
                          </Card.Body>
                          <>
                            <Button key={"contentDwnBtn-" + idx} id={"contentDwnBtn-" + idx} variant="primary" onClick={() => {
                              onetroll = i;
                              setModalShow(true);
                            }}>
                              Download Audio/ Video File
                            </Button>
                          </>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </CardGroup>
              </Container>
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => { setModalShow(false); }}
      />
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("highest");
console.log("process.env.REACT_APP_YOUTUBE_API_KEY",process.env.REACT_APP_YOUTUBE_API_KEY);
  fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + onetroll.videoId + '&key=' + process.env.REACT_APP_YOUTUBE_API_KEY)
    .then(response => response.json())
    .then((data) => {
      window.localStorage.setItem('youtube-user-id', data.items[0].snippet.channelId);
      window.localStorage.setItem('youtube-channel-name', data.items[0].snippet.channelTitle);
    });
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
                <iframe className="embed-responsive-item" frameBorder="1" src={"https://www.youtube.com/embed/" + onetroll.videoId + "?autoplay=1"} ></iframe>
              </div>
            </Col>
            <Col xs={5} sm={5} md={5} lg={5} className="p-1" >
              <Row xs={12} sm={12} md={12} lg={12} className="p-2">
                <YouTubeSubscribe
                  channelid={window.localStorage.getItem('youtube-user-id')}
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
                <Button onClick={() => { window.open("https://zvemy.sse.codesandbox.io/download?URL=https://www.youtube.com/watch?v=" + onetroll.videoId + "&format=" + format + "&quality=" + quality, "_blank", 'newwindow') }} >Download & Close Popup</Button>
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
          <Row xs={12} sm={12} className="p-1" >
            <center>
              <div className="embed-responsive embed-responsive-16by9 ">
                <iframe className="embed-responsive-item" src={"https://www.youtube.com/embed/" + onetroll.videoId + "?autoplay=1"} ></iframe>
              </div>
            </center>
          </Row>
        </Container>
      </Modal.Body>
      <Button className="d-sm-block d-xs-block d-lg-none d-md-none d-xl-none" onClick={() => { window.open("https://zvemy.sse.codesandbox.io/download?URL=https://www.youtube.com/watch?v=" + onetroll.videoId + "&format=" + format + "&quality=" + quality, "_blank") }} >Download & Close Popup</Button>
    </Modal>
  );
}
export default App;
