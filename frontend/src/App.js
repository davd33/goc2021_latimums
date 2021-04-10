import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Peer from 'simple-peer';
import './App.css';

function App(){

    const wsConnect = () => {
        console.log('connect to python websocket');
        const socket = new window.WebSocket(`ws://${window.token}:8769`);

        socket.addEventListener('message', onMessage);

        function onMessage (event) {
            const message = event.data;
            // if (message === 'ready') {
            //     if (peer) return;
            //     peer = new Peer({ initiator: true });
            //     peer.on('signal', function (signal) {
            //         socket.send(JSON.stringify(signal));
            //     });
            //     peer.on('connect', function () {
            //         endless.pipe(peer);
            //     });
            // } else {
            //     peer.signal(JSON.parse(message));
            // }
            console.log(event);
        }
    };

    return (
        <div>
          <button onClick={wsConnect}>connect ws</button>
        </div>
    );
}

export default App;
