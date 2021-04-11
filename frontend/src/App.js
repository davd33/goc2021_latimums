import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Peer from 'simple-peer';
import RStream from 'readable-stream';
import {VideoCanva} from './components/video-canva/VideoCanva';
import {newBindStreamFct} from './utils/video-stream';
import './App.css';

function App(){

    const [videoStream, setVideoStream] = useState(null);

    const wsConnect = (isStreamMode) => {
        const socket = new window.WebSocket(`ws://${window.token}:8769`);
        socket.addEventListener('message', onMessage);
        let peer;

        function onMessage (event) {
            const message = event.data;

            if (JSON.parse(message) === 'ready') {
                if (peer) return;

                peer = new Peer({ initiator: isStreamMode, stream: videoStream });

                peer.on('signal', function (signal) {
                    socket.send(JSON.stringify(signal));
                });

                if (isStreamMode) {
                    peer.on('connect', function () {
                        console.log("stream mode - send endless");
                    });
                } else {
                    peer.on('stream', function (stream) {
                        console.log('receive stream');
                    });
                }

            } else if (peer) {
                peer.signal(JSON.parse(message));
            }

        }
    };

    return (
        <div>
          <button onClick={() => wsConnect(true)}>Stream my Video</button>
          <button onClick={() => wsConnect(false)}>Connect to Stream</button>
          <VideoCanva bindStream={newBindStreamFct((stream) => !!videoStream && setVideoStream(stream))} />
        </div>
    );
}

export default App;
