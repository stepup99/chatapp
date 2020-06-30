const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const dbInfo = require("./config");
var bodyParser = require('body-parser')
server.listen(8000);
const cors = require('cors');
const axios = require('axios');


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

let people = [];
let userdata;
app.use(cors());

const mongoose = require('mongoose');

mongoose.connect(dbInfo.dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

mongoose.connection.on('error', function (err) {
    console.log("Mongoose default connection has occured " + err + " error");
});

const user = require('./users/users.js');
app.use('/api/user', user);

const PORT = 8080;
app.listen(PORT, (req, res) => {
    console.log("listening on " + PORT);
})

io.on('connection', async (socket) => {
    console.log("********************************************************************************");
    console.log("***************** on connect ****************");
    console.log(socket.id);
    console.log("***************** on connect ****************");



    socket.on('typing', (data) => {
        console.log("inside typing...........")
        console.log(data);
        console.log("inside typing...........")

        socket.to(data.socketid).emit('sendtyping', "a message to everyone in the room,except me");
        // socket.emit('sendtyping', {
        //     message: data
        // })
    });

    socket.on('userid', async (data) => {
        userdata = data;


        console.log("***********userid******************");
        console.log(people);
        console.log("***********userid******************");
        let x = people.findIndex(item => {
            console.log("***********item.id, data.userid**********")
            console.log(item.id, data.userid)
            console.log("***********item.id, data.userid**********")
            if (item.id === data.userid) {
                return true;
            }
            return false;
        });
        console.log("********** i m x");
        console.log(x);
        console.log("********** i m x");
        if (x === -1) {
            const newObj = {};
            newObj['id'] = userdata.userid;
            newObj['socketid'] = [socket.id];
            people = [...people, newObj];
        } else {
            console.log("inside else")
            people.some(checkcriteriaonconnect);
        }
        console.log("............ on getting userid ");
        console.log(people);
        console.log("............ on getting userid ");
        // await axios.put('http://localhost:8080/api/user/updateuserstatus/' + userdata.userid + '/' + true + '/' + socket.id);
        // const updatedData = await axios.get('http://localhost:8080/api/user/');
        // io.sockets.emit('socketfig', updatedData.data);
    });

    function checkcriteriaonconnect(item, index) {
        console.log('********checkcriteriaonconnect***********')
        console.log(item, index);
        if (item.id === userdata.userid) {
            people[index].socketid.push(socket.id);
        }
        console.log(people);
        console.log('********checkcriteriaonconnect***********')
    }
    socket.on("disconnect", async () => {

        console.log("*****************connection lost****************");
        console.log(socket.id);
        console.log("*****************connection lost****************");
        // if (people.length > 0) {
        //     let updatepeople = people.filter(item => item.socketid === socket.id);
        //     if (updatepeople.length > 0) {
        //         console.log("........... disconnected finally");
        //         await axios.put('http://localhost:8080/api/user/updateuserstatus/' + updatepeople[0].id + '/' + false + '/' + null);
        //         const updatedData = await axios.get('http://localhost:8080/api/user/');
        //         io.sockets.emit('socketfig', updatedData.data);
        //     }
        // }
        // if (people.length > 0) {
        //     people = people.filter(item => item.socketid !== socket.id);
        //     console.log(".......... on disconnected")
        //     console.log(people)
        //     console.log(".......... on disconnected")
        // }


        if (people.length > 0) {
            people.some(checkcriteria);
            console.log("*******==============**********")
            console.log(people);
            console.log("*******==============**********")
        }


        function checkcriteria(item, index) {
            console.log("******i  m inside function checkcriteria *******")
            // it will remove all the socketid when the browser closed 
            console.log(item.socketid, socket.id)
            if (item.socketid.includes(socket.id)) {
                console.log("inside if condition");
                // if socketid is there then remove it  	
                const socketindex = item.socketid.indexOf(socket.id);
                console.log(socketindex);
                if (socketindex > -1) {
                    item.socketid.splice(socketindex, 1)
                }
                return true
            } else {
                console.log("else condition")
                if (item.socketid.length === 0) {
                    // update online to offline
                    console.log("**********update online to offline************")
                    people.splice(index, 1);
                    console.log(people)
                    console.log("**********update online to offline************")
                }
            }
        }



    });

});




