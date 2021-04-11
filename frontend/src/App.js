import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Peer from 'simple-peer';
import RStream from 'readable-stream';
import {VideoCanva} from './components/video-canva/VideoCanva';
import './App.css';

function App(){


    const wsConnect = (isStreamMode) => {
        const socket = new window.WebSocket(`ws://${window.token}:8769`);

        socket.addEventListener('message', onMessage);

        const buf = Buffer.alloc(10000);

        const endless = new RStream.Readable({
            read: function () {
                this.push(buf);
            }
        });

        let peer;

        function onMessage (event) {
            const message = event.data;

            if (JSON.parse(message) === 'ready') {
                if (peer) return;
                peer = new Peer({ initiator: isStreamMode });
                peer.on('signal', function (signal) {
                    socket.send(JSON.stringify(signal));
                });
                if (isStreamMode) {
                    peer.on('connect', function () {
                        endless.pipe(peer);
                        console.log("stream mode - send endless");
                    });
                } else {
                    peer.on('data', function (message) {
                        console.log('receive mode', message.length);
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
        </div>
    );
}

export default App;
