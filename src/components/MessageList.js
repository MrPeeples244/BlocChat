import React, { Component } from 'react';

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

  render() {
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
            </li>
            )}
        </ul>
      </main>
    );
  }
}

export default MessageList;
