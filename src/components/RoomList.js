import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
    super(props)

    this.state = {
      rooms: [],
      newRoom: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room )})
      });
    }

    createRoom(e) {
      let newRoomName = this.state.newRoom;
      this.roomsRef.push({ name: newRoomName });
    }

    handleChange(e) {
      this.state.newRoom = this.setState({newRoom: e.target.value});
    }

    render() {
      return (
        <div>
          <ul className='room-list'>
            {this.state.rooms.map((room) =>
              <li key={room.key}>{room.name}</li>
              )}
          </ul>

          <form onSubmit={this.createRoom}>
            <input type="text" value={this.state.newRoom} placeholder="Start a New Chat!" onChange={this.handleChange}/>
            <input type="submit" value="Create Room"/>
          </form>
        </div>
      );
    }
  }


export default RoomList;
