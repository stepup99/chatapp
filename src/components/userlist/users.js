import React, { Component } from 'react';
import './users.css';
import { connect } from 'react-redux';
import { userclickAction } from '../../actions/index';
import openSocket from '../../socketlink';

class Users extends Component {
    state = {
        group: [],
        loading: false
    }


    componentDidMount() {
        this.setState({
            loading: true
        });

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let userid = urlParams.get('userid').trim();
        openSocket.emit('userid', {
            userid
        });

        openSocket.on('socketfig', (data) => {
            console.log("i m socketid componentDidMount");
            this.setState({
                group: data
            })

            this.setState({
                loading: false
            })

        });

        // console.log("inside componentDidMount");
    }

    componentDidUpdate() {
        // console.log("inside componentDidUpdate");
    }



    render() {


        let userdata = this.state.group.map((item, index) => {
            return <div key={index} data-id={item._id} onClick={(e) => {
                this.props.clickfn(item)
            }} className="individualElm">{item.name}<div className={item.status ? 'online' : 'offline'}> </div></div>
        });

        return (

            this.state.loading ? "loading...." : < div className="userlistElm" >{userdata}</div >

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickfn: (name => { dispatch(userclickAction(name)) })
    }
}


export default connect(null, mapDispatchToProps)(Users);
