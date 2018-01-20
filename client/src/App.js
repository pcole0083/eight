import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    this.fetchUser(1);
  }

  componentWillUpdate(){
    let user = this.state.user;
  }

  fetchUser = id => {
    fetch('/users/'+id)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  changeUser = evt => {
    let clicked = evt.target;
    let new_id = clicked.getAttribute('data-id');
    if(!!new_id){
      this.fetchUser(new_id);
    }
  }

  render() {
    let intervals = !!this.state.user && !!this.state.user.intervals ? this.state.user.intervals.map(interval =>
      <div key={interval.id}>{interval.id}: {interval.score}</div>
    ) : '';

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <ul>
            <li><button onClick={this.changeUser} data-id="1">User 1</button></li>
            <li><button onClick={this.changeUser} data-id="2">User 2</button></li>
            <li><button onClick={this.changeUser} data-id="3">User 3</button></li>
          </ul>
        </header>
        <h1>Users</h1>
        { intervals }
      </div>
    );
  }
}

export default App;
