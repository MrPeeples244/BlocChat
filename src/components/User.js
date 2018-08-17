import React, { Component } from 'react';

class User extends Component {

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(){
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
      });
  }

  render() {
    return(
        <div>
          <button onClick={() => this.signIn()}>Login</button>
          <button onClick={() => this.signOut()}>Logout</button>
          {this.props.user ? this.props.user.displayName : "Guest User"}
        </div>
    )
  }
}

export default User;
