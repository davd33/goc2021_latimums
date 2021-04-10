import React, {useEffect, useState} from 'react';
import Webcam from 'webcam-easy';

function VideoCanva() {

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
          <video ref={webcamRef} autoplay playsinline width="640" height="480"></video>
          <canvas ref={canvasRef} className="d-none"></canvas>
          <audio ref={snapSoundRef} src="audio/snap.wav" preload = "auto"></audio>
        </div>
    );
}
