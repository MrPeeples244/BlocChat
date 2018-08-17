import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
    this.state = {
      activeRoom: "",
      user: ""
      }
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <User
          firebase={firebase}
          setUser={ (user) => this.setUser(user)}
          user={this.state.user}
        />
        <RoomList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          setActiveRoom={this.setActiveRoom.bind(this)}
        />
        <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          user={this.state.user}
        />

      </div>
    );
  }
}

export default App;
