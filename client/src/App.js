import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/materialize.min.css';
import Piechart from './components/Piechart';

class App extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    this.fetchUser(1);
  }

  componentDidUpdate(){
    console.log(this.state.user);
  }

  fetchUser = id => {
    fetch('/users/'+id)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  changeUser = evt => {
    let clicked = evt.target;
    if(!!clicked && clicked.nodeName === 'I'){
      clicked = evt.target.parentElement;
    }

    let new_id = clicked.getAttribute('data-id');
    if(!!new_id){
      this.fetchUser(new_id);
    }
  }

  stageData(stages, type){
    return stages.map(stage => {
        if(stage.stage === type){
          return stage.duration;
        }
        return 0;
      })
      .reduce(( a, b ) => {
        return a + b;
      }, 0);
  }

  render() {
    // let intervals = !!this.state.user && !!this.state.user.intervals ? this.state.user.intervals.map(interval =>
    //   <div key={interval.id}>{interval.id}: {interval.score}</div>
    // ) : '';

    var datapoints = !!this.state.user && !!this.state.user.intervals ? this.state.user.intervals.map(interval => {
      
      var out = this.stageData(interval.stages, 'out');
      var awake = this.stageData(interval.stages, 'awake');
      var light = this.stageData(interval.stages, 'light');
      var deep = this.stageData(interval.stages, 'deep');

      return [
        {
          value: out,
          color:"#880e4f",
          highlight: "#c2185b",
          label: "Out"
        },
        {
          value: awake,
          color:"#1565c0",
          highlight: "#2196f3",
          label: "Out"
        },
        {
          value: light,
          color: "#5e35b1",
          highlight: "#7e57c2",
          label: "Light"
        },
        {
          value: deep,
          color: "#1a237e",
          highlight: "#3949ab",
          label: "Deep"
        }
      ];
    }) : [];

    var pieCharts = datapoints.map((data,index) => {
      return <div key={index} className="col s12 m12 l4"><h5>Day {index+1}</h5><Piechart data={data} width="100%" height="auto" /></div>;
    });

    return (
      <div className="App blue lighten-5">
        <header className="container App-header">
          <h1>Users</h1>
          <ul className="row">
            <li className="col s4"><button onClick={this.changeUser} className="btn btn-floating" title="User 1" data-id="1" ><i className="material-icons">assignment_ind</i></button></li>
            <li className="col s4"><button onClick={this.changeUser} className="btn btn-floating lime" title="User 2" data-id="2" ><i className="material-icons">assignment_ind</i></button></li>
            <li className="col s4"><button onClick={this.changeUser} className="btn btn-floating red darken-3" title="User 3" data-id="3" ><i className="material-icons">assignment_ind</i></button></li>
          </ul>
        </header>
        <div id="content" className="container">
          <div className="card-panel blue lighten-2">
            <div className="row">
              { pieCharts }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
