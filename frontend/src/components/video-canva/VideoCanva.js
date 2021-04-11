import React, {useEffect, useState} from 'react';

export function VideoCanva({bindStream}) {

    const [webcamRef] = useState(React.createRef());
    const [canvasRef] = useState(React.createRef());
    const [snapSoundRef] = useState(React.createRef());

    useEffect(() => {
        bindStream(webcamRef.current, canvasRef.current, snapSoundRef.current);
    });

    return (
        <div>
          <video ref={webcamRef} autoplay playsinline width="640" height="480"></video>
          <canvas ref={canvasRef} className="d-none"></canvas>
          <audio ref={snapSoundRef} src="audio/snap.wav" preload="auto"></audio>
        </div>
    );
}
