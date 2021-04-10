import React, {useEffect, useState} from 'react';
import Webcam from 'webcam-easy';
import logo from './logo.svg';
import './App.css';

function App() {

    const [webcamRef] = useState(React.createRef());
    const [canvasRef] = useState(React.createRef());
    const [snapSoundRef] = useState(React.createRef());

    useEffect(() => {
        const webcam = new Webcam(webcamRef.current, 'user', canvasRef.current, snapSoundRef.current);

        webcam.start()
            .then(result =>{
                console.log("webcam started");
            })
            .catch(err => {
                console.log(err);
            });
    });

    return (
        <div className="App">
          Here
          <video ref={webcamRef} autoplay playsinline width="640" height="480"></video>
          <canvas ref={canvasRef} className="d-none"></canvas>
          <audio ref={snapSoundRef} src="audio/snap.wav" preload = "auto"></audio>
        </div>
    );
}

export default App;
