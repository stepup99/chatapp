import React, { Component } from 'react'
import openSocket from '../../socketlink';
import { connect } from 'react-redux';
class Send extends Component {

    state = {
        inputchange: ""
    }




    ChangeFn = async (e) => {
        this.setState({
            inputchange: e.target.value
        });

        if (this.props.to.socketid !== "null") {

            openSocket.emit('typing', {
                message: "typing ...",
                socketid: this.props.to.socketid
            });

        }

        openSocket.on('sendtyping', (data) => {
            console.log(data)
        });


    }

    render() {

        return (
            <div>
                <div className="input-field col s12">
                    <input
                        onChange={(e) => { this.ChangeFn(e) }}
                        id="input_text"
                        type="text"
                        data-length="10"
                        placeholder="Type Here"
                        value={this.state.inputchange}
                    />

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {

    console.log("inside send js")
    console.log(state)
    return {
        to: state.selecteduser
    }
}
export default connect(mapStateToProps, null)(Send);