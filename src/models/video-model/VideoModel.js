import React, { useState } from 'react';
import YouTubeSubscribe from "../../youtubeSubscribe";
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import "./VideoModel.scss";


export default function VideoModel(props) {
    const [format, setFormat] = useState("mp4");
    const [quality, setQuality] = useState("highest");

    async function closeWindow(url) {
        props.onHide();
        window.open(url,
            "mywindow", "width=150,height=150");
    }

    if (Object.keys(props.input).length === 0) {
        return (<></>);
    } else {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.input.dialog}
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Container className="d-none d-md-block d-lg-block d-xl-block">
                        <Row>
                            <Col xs={7} sm={7} md={7} lg={7} className="p-3" >
                                <div className="embed-responsive embed-responsive-16by9 ">
                                    <iframe title={props.input.videoId} className="embed-responsive-item" frameBorder="1" src={"https://www.youtube.com/embed/" + props.input.videoId + "?autoplay=1"} ></iframe>
                                </div>
                            </Col>
                            <Col xs={5} sm={5} md={5} lg={5} className="p-1" >
                                <Row xs={12} sm={12} md={12} lg={12} className="p-2">
                                    <YouTubeSubscribe
                                        channelid={props.input.yId}
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
                                    <Button onClick={() => { closeWindow("https://zvemy.sse.codesandbox.io/download?URL=https://www.youtube.com/watch?v=" + props.input.videoId + "&format=" + format + "&quality=" + quality, "_blank", 'newwindow') }} >Download & Close Popup</Button>
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
                                    channelid={props.input.yId}
                                    theme={"default"}
                                    layout={"full"}
                                    count={"default"}
                                />
                            </Col>
                        </Row>
                        <center>
                            <div className="embed-responsive embed-responsive-16by9 ">
                                <iframe title={props.input.videoId} className="embed-responsive-item" src={"https://www.youtube.com/embed/" + props.input.videoId + "?autoplay=1"} ></iframe>
                            </div>
                        </center>
                    </Container>
                </Modal.Body>
                <Button className="d-sm-block d-xs-block d-lg-none d-md-none d-xl-none" onClick={() => { closeWindow("https://zvemy.sse.codesandbox.io/download?URL=https://www.youtube.com/watch?v=" + props.input.videoId + "&format=" + format + "&quality=" + quality, "_blank") }} >Download & Close Popup</Button>
            </Modal>
        );
    }
}