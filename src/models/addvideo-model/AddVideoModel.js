import "./AddVideoModel.scss";
import { Modal } from 'react-bootstrap';
import React from 'react';
import { Upload } from 'react-bootstrap-icons';
import useForm from './useForm';

export default function AddVideoModel(props) {

    const [response, setResponse] = React.useState("");

    const formLogin = () => {
        handleChange(); 
        console.log("Callback function when form is submitted!");
        console.log("Form Values ", values);
        createdRecordAndSetResponseHeader(); 
    }

    

    const { handleChange, values, errors, handleSubmit } = useForm(formLogin);


    async function createdRecordAndSetResponseHeader() {
        await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/troll-bank-web-app-phlnx/endpoint/addvideo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "videoId": "pmHHEtLq7JY",
                "tags": "biggbosstelugu biggboss telugu bigboss bb prabhas",
                "dialog": "Swetha Varma Angry Look",
                "yId": "UCqED2kjOm3ruDBF9ivjOovQ",
                "yCName": "BIFROST"
            })
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setResponse("video uploaded successfully" + data);
                setTimeout(() => { setResponse(""); props.onHide(); }, 3000);
            })


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
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input minLength='8' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onSubmit={handleSubmit} />
                        {
                            errors.email && <h3>{errors.email}</h3>
                        }
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input minLength='8' type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onSubmit={handleSubmit} />
                        {
                            errors.password && <h3>{errors.password}</h3>
                        }
                    </div>
                    <div class="form-group form-check">
                        <input minLength='8' type="checkbox" class="form-check-input" id="exampleCheck1" onSubmit={handleSubmit} />
                        {
                            errors.username && <h3>{errors.username}</h3>
                        }
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </Modal.Body>

        </Modal>
    );

}