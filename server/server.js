const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(8000);
const cors = require('cors');

app.use(cors());

io.on('connection', (socket) => {
    //console.log("connnect sockets")
    socket.on('sendmessage', (data) => {
        console.log(data)
    });
});


