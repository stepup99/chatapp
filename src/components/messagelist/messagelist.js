import React, { Component } from 'react';
import './message.css';
import { connect } from 'react-redux';


class Messagelist extends Component {
    render() {
        return (
            <div>
                {this.props.myseledteduser.hasOwnProperty("name") && <div data-socketid={this.props.myseledteduser.socketid}>selected user is : {this.props.myseledteduser.name}
                </div>}
                <div className="messageElm">
                    this is messsagelist
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        myseledteduser: state.selecteduser
    }
}


export default connect(mapStateToProps, null)(Messagelist);
