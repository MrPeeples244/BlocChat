import React, { Component } from 'react';
import moment from 'moment';
import '../styles/messageList.css';


class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      newMessage: ''
    };
    this.messagesRef = this.props.firebase.database().ref('messages')
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message)});

    });
  }

  createMessage(e) {
    e.preventDefault();


    if(this.state.newMessage){
      const newText = {
        content: this.state.newMessage,
        username: this.props.user ? this.props.user.displayName : 'Guest User',
        roomId: this.props.activeRoom.key,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      }
      this.messagesRef.push(newText);
      this.setState({ newMessage: '' });
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newMessage: e.target.value });
  }

  render() {
    let time = function(message) {
    let timeStamp;
    try {
      timeStamp = moment(message.sentAt).format("h:mm a");
    }
    catch(e) {
      timeStamp = 0;
    }
    return timeStamp;
    };
    if(this.props.activeRoom){
    return (
      <main className='main'>
        <div id='room-title-banner'>
          <h2 id='room-title'>{this.props.activeRoom.name}</h2>
        </div>
        <ul id='messages-list'>
          {this.state.messages
            .filter(message => this.props.activeRoom.key === message.roomId )
            .map( message =>
            <li id='message' key={message.key}>
              <div className="message-user">{message.username}</div>
              <div className="message-content">{message.content}</div>
              <div className="message-time">{time(message)}</div>
            </li>
            )}
        </ul>
        <div className='new-message-form-container'>
          <form onSubmit={ (e) => this.createMessage(e) }>
            <input id='message-text-input'
                   type="text"
                   value={this.state.newMessage}
                   onChange={ (e) => this.handleChange(e) }
                   placeholder="Start Typing!"
                   size="100"
            />
            <input type="submit"
                   value="Send"
            />
          </form>
        </div>
      </main>
    );
  }
  else{
    return (
      <main className="main">
        <div id='banner'>
          <div id='banner-text'>Select a room or start a new one to begin!</div>
        </div>
        <div id='buffer'></div>
        <div id='banner-low'></div>
      </main>
      );
  }
  }
}

export default MessageList;
