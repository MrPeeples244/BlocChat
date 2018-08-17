import React, { Component } from 'react';

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
        <aside>
          <h2>Available Chat Rooms</h2>
          <ul className='room-list'>
            {this.state.rooms.map(room =>
              <li key={room.key} >
                <button onClick={() => this.props.setActiveRoom(room)}>{room.name}</button>
              </li>
              )}
          </ul>

          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text" value={this.state.newRoom} placeholder="Start a New Chat!" onChange={this.handleChange.bind(this) }/>
            <input type="submit" value="Create Room"/>
          </form>
        </aside>
      );
    }
  }


export default RoomList;
