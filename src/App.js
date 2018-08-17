import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
    apiKey: "AIzaSyBumo6tCYNmiq1diKB0F-l4Cr8MbAhqdr0",
    authDomain: "bloc-chat-react-cc6d1.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-cc6d1.firebaseio.com",
    projectId: "bloc-chat-react-cc6d1",
    storageBucket: "bloc-chat-react-cc6d1.appspot.com",
    messagingSenderId: "1024631945472"
  };
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeRoom: ""};
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)}/>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
      </div>
    );
  }
}

export default App;
