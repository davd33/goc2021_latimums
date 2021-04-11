import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Peer from 'simple-peer';
import RStream from 'readable-stream';
import './App.css';

function App(){


    const wsConnect = (isStreamMode) => {
        console.log('connect to python websocket');
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
            console.log('0');
            const message = event.data;
            console.log(message);
            if (JSON.parse(message) === 'ready') {
                console.log('2', peer);
                if (peer) return;
                peer = new Peer({ initiator: isStreamMode });
                console.log('3', peer);
                peer.on('signal', function (signal) {
                    console.log('signal !');
                    socket.send(JSON.stringify(signal));
                });
                if (isStreamMode) {
                    console.log('5');
                    peer.on('connect', function () {
                        console.log('stream try to send');
                        endless.pipe(peer);
                        console.log("stream mode - send endless");
                    });
                } else {
                    console.log('6');
                    peer.on('data', function (message) {
                        console.log('receive mode', message.length);
                    });
                }

            } else if (peer) {
                console.log('not ready');
                peer.signal(JSON.parse(message));
            }

            console.log(event);
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
