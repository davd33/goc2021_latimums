import Webcam from 'webcam-easy';

export function newBindWebcamStreamFct(onMediaStream) {
    return (webcamEl, canvasEl, snapSoundEl) => bindWebcamStream(webcamEl, canvasEl, snapSoundEl, onMediaStream);
}

export function newBindWsStreamFct(onMediaStream) {
    return (webcamEl, canvasEl, snapSoundEl) => bindWsStream(webcamEl, canvasEl, snapSoundEl, onMediaStream);
}

export function bindWsStream(webcamEl, canvasEl, snapSoundEl, onMediaStream) {

    onMediaStream(webcamEl);
}

export function bindWebcamStream(webcamEl, canvasEl, snapSoundEl, onMediaStream) {

    const webcam = new Webcam(webcamEl, 'user', canvasEl, snapSoundEl);

    webcam.start()
        .then(result =>{
            navigator.mediaDevices.getUserMedia({
                video: true, audio: true
            })
                .then(onMediaStream)
                .catch(() => console.log('error getting user media (video stream)'));
        })
        .catch(err => {
            console.log(err);
        });

}
