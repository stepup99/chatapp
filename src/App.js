import React from 'react';
import './App.css';
import Messagelist from './components/messagelist/messagelist';
import Users from './components/userlist/users';
import Send from './components/messagesend/send';
function App() {
  return (
    <div className="App">
      {/* <div class="row">
        <div class="col s12">This div is 12-columns wide on all screen sizes</div>
        <div class="col s6">6-columns (one-half)</div>
        <div class="col s6">6-columns (one-half)</div>
      </div> */}

      <div className="container containerElm">
        <div className="row rowElm">
          <div className="col s2 userElm"><Users /></div>
          <div className="col s10 messagelist"><Messagelist /></div>
        </div>
        <div className="row">
          <Send />
        </div>
      </div>
    </div>
  );
}

export default App;
