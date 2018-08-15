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
      this.setState({ newRoom: e.target.value });
    }
    handleSubmit(e) {
      e.preventDefault();
      this.createRoom(this.state.newRoom);
    }

    render() {
      return (
        <div>
          <ul className='room-list'>
            {this.state.rooms.map((room) =>
              <li key={room.key}>{room.name}</li>
              )}
          </ul>

          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text" value={this.state.newRoom} placeholder="Start a New Chat!" onChange={(e)=>this.handleChange(e)}/>
            <input type="submit" value="Create Room"/>
          </form>
        </div>
      );
    }
  }


export default RoomList;
