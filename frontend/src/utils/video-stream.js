import Webcam from 'webcam-easy';

export function newBindStreamFct(onMediaStream) {
    console.log('1111111111111111111');
    return (webcamEl, canvasEl, snapSoundEl) => {
        console.log('WE BIND THE STREAAAAM');
        bindWebcamStream(webcamEl, canvasEl, snapSoundEl, onMediaStream);
    };
}

export function bindWebcamStream(webcamEl, canvasEl, snapSoundEl, onMediaStream) {

    console.log('cannaaoeuhteonsuheotns');
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
