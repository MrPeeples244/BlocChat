import React, { Component } from 'react';
import '../styles/roomList.css';

class RoomList extends Component {
    constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      newRoom: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room )})

      });
    }

    createRoom(newRoom) {
      this.roomsRef.push({ name: newRoom });
      this.setState({ newRoom: '' });
    }

    handleChange(e) {
      e.preventDefault();
      this.setState({ newRoom: e.target.value });
    }

    handleSubmit(e) {
      e.preventDefault();
      this.createRoom(this.state.newRoom);
    }


    render() {
      return (
        <aside className='sidebar'>
          <h1 id='title'>Bloc Chat</h1>
          <h2>Available Rooms</h2>
          <ul className='room-list'>
            {this.state.rooms.map(room =>
              <li key={room.key} >
                <button className='room-buttons' onClick={() => this.props.setActiveRoom(room)}>{room.name}</button>
              </li>
              )}
          </ul>
          <h2>Start New Room</h2>
          <form className="new-room-form" onSubmit={ (e) => this.handleSubmit(e) }>
            <input id='new-chat-field'
                   type="text"
                   value={this.state.newRoom}
                   placeholder="New Chat Room Name"
                   onChange={this.handleChange.bind(this)}
            />
            <input id="create-room-button"
                   type="submit"
                   value="Create Room"
            />
          </form>
        </aside>
      );
    }
  }


export default RoomList;
