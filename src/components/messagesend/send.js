import React, { Component } from 'react'
import openSocket from 'socket.io-client';
class Send extends Component {

    state = {
        getdata: "anujdata"
    }

    async componentDidMount() {
        console.log("inside compo");
        let socket = await openSocket('http://localhost:8000');
        socket.emit('sendmessage', {
            message: "intitial handshare"
        });
    }



    render() {

        return (
            <div>
                <div className="input-field col s12">
                    <input id="input_text" type="text" data-length="10" placeholder="Type Here" />
                    <div>{this.state.getdata}</div>
                </div>
            </div>
        )
    }
}
export default Send;