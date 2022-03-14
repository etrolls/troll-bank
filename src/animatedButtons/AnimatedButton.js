import "./AnimatedButton.scss";
import React from "react";
import AddVideoModal from "../models/addvideo-model/AddVideoModel";


export default function AnimatedButton() {

    const [AddVideoModel, setAddVideoModel] = React.useState(false);

    return (
        <>
            <a href="/#" onClick={() => {
                setAddVideoModel(true);
            }} key={"AddVideoPopupDesktop"} id={"AddVideoPopupDesktop"} className="d-none d-md-block d-lg-block d-xl-block animated-button1">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Add A Video & Get Youtube Views 👁️ + Rewards 💰 + Followers 💚
            </a>
            <a href="/#" onClick={() => {
                setAddVideoModel(true);
            }} key={"AddVideoPopupMobile"} id={"AddVideoPopupMobile"} className="d-sm-block d-xs-block d-lg-none d-md-none d-xl-none animated-button1 mAbutton">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Add A Video & Get Youtube Views 👁️ + Rewards 💰 + Followers 💚
            </a>

            <AddVideoModal
                show={AddVideoModel}
                onHide={() => { setAddVideoModel(false); }}
            /></>
    )
}


