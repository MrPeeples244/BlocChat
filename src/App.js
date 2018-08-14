import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
