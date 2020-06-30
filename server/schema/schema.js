const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chatusers = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    mobile: {
        type: String
    },
    status: {
        type: Boolean
    },
    socketid: {
        type: String
    }
});

module.exports = {
    users: mongoose.model('chatuser', Chatusers)
}