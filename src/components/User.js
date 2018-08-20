import React, { Component } from 'react';
import '../styles/user.css';

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
    if(!this.props.user){
      return(
          <div className='user-container'>
            <h2 className='signIn-label'>Sign In</h2>
            <p className='display-user'>You are not signed in.</p>
            <p className='display-user'>Sign in or contnue as guest.</p>
            <button className='login-buttons' onClick={() => this.signIn()}>Login</button>
          </div>
      )
    }
    else{
      return(
        <div className='user-container'>
          <h2 className='signIn-label'>Sign In</h2>
          <p className='display-user'>Signed in as:</p>
          <p className='display-user'>{this.props.user.displayName}</p>
          <button className='login-buttons' onClick={() => this.signOut()}>Logout</button>
        </div>

    )
  }
  }
}

export default User;
