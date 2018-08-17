import React, { Component } from 'react';
import moment from 'moment';


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
        username: this.props.user.displayName || 'Guest user',
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
      <main>
        <h2>{this.props.activeRoom.name}</h2>
        <ul className='messages-list'>
          {this.state.messages
            .filter(message => this.props.activeRoom.key === message.roomId )
            .map( message =>
            <li key={message.key}>
              <div>{message.username}</div>
              <div>{message.content}</div>
              <div>{time(message)}</div>
            </li>
            )}
        </ul>
        <div>

          <form onSubmit={ (e) => this.createMessage(e) }>
            <input type="text"
                   value={this.state.newMessage}
                   onChange={ (e) => this.handleChange(e) }
                   placeholder="Start Typing!"
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
      <main>
        <h2>{this.props.activeRoom.name}</h2>
        <ul className='messages-list'>
          {this.state.messages
            .filter(message => this.props.activeRoom.key === message.roomId )
            .map( message =>
            <li key={message.key}>
              <div>{message.username}</div>
              <div>{message.content}</div>
              <div>{time(message)}</div>
            </li>
            )}
        </ul>
      </main>  
      );
  }
  }
}

export default MessageList;
