import openSocket from 'socket.io-client';
const socketFn = openSocket('http://localhost:8000');


export default socketFn