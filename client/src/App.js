import React, { Component } from 'react';
import logo from './logo.svg';

//libaries
import moment from 'moment';

//helpers
import hexToRgbA from './helpers/hextorgba';
import splitOnCaps from './helpers/splitoncaps';

//components
import Piechart from './components/Piechart';
import Linechart from './components/Linechart';

//style imports
import './App.css';
import './css/materialize.min.css';

class App extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    this.fetchUser(1); //initial fetch of data
  }

  //get user data from the backend
  //express app backend async calls the JSON files
  fetchUser = id => {
    fetch('/users/'+id)
      .then(res => res.json())
      .then(user => {
        user.intervals = user.intervals.reverse();
        this.setState({ user });
      });
  }

  //click event on the user icons
  changeUser = evt => {
    let clicked = evt.target;
    //if the pointer event lands on the child
    //css is set to pointer-events: none, but that does not work on older browsers
    if(!!clicked && clicked.nodeName === 'I'){
      clicked = evt.target.parentElement;
    }

    //get the ID of the user.
    //the IDs are just numeric order of json data, but for the FE this can be anything so long as the server understands.
    let new_id = clicked.getAttribute('data-id');
    if(!!new_id){
      this.fetchUser(new_id);
    }
  }

  //map and reduce the stage data to use in the pie charts
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

  //get Toss & Turn Data
  getTntCount(interval){
    var tnt = !!interval.timeseries ? interval.timeseries.tnt : [];
    return (
      <div className="tnt-count">Number of Toss & Turns: {tnt.length}</div>
    );
  }

  //create a series of pie charts
  createPieCharts(){
    var datapoints = !!this.state.user && !!this.state.user.intervals ? this.state.user.intervals.map(interval => {
      
      var out = this.stageData(interval.stages, 'out');
      var awake = this.stageData(interval.stages, 'awake');
      var light = this.stageData(interval.stages, 'light');
      var deep = this.stageData(interval.stages, 'deep');

      //we can do this only because we know there are these 4 stages
      //this can be improved by allowing color, higlight, label arrays to be passed in
      //we could do all this in one loop over stagees in the future but that would be a lot to do inside the map loop.
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



    return datapoints.map((data,index) => {
      return (<div key={index} className="col s12 m12 l4">
        <h5>Night {index+1} Stages</h5>
        <Piechart data={data} width="100%" height="auto" />
        { this.getTntCount(this.state.user.intervals[index]) }
      </div>);
    });
  }

  //get data from time series transformed. Most suitabled for data with shared keys like HR and RR
  getTimeseriesChildData(timeseries, key){
    if(!key){
      throw new Error('Key is required to retrieve data.');
    }
    let tsChildData = timeseries[key];
    var newObj = {};
    var labels = [];
    var data = [];

    tsChildData.forEach((rate,index) => {
        labels.push(moment(rate[0]).format('L h:mm a'));
        data.push(parseInt(rate[1]));
    });
    newObj['labels'] = labels;
    newObj['data'] = data;
    return newObj;
  }

  //create a line chart by transforming the data into the format chartjs required
  //should move this to a seperate helper or component
  createLineChart(type, heading, color, secondary){
    if(!!this.state.user && !!this.state.user.intervals){
      var labels = [];
      var rrData = [];
      var data = this.state.user.intervals.map((interval, index) => {
        var hrData = {};
        
        hrData = this.getTimeseriesChildData(interval.timeseries, type);
        rrData.push(this.getTimeseriesChildData(interval.timeseries, secondary).data);

        labels = labels.concat(hrData.labels);

        return hrData.data;
      });

      //var colors = ['#e0f2f1', '#607d8b', '#3f51b5'];
      color = !!color ? color :'#e0f2f1';

      data = data.reduce(
      function(a, b) {
        return a.concat(b);
      },[]);

      var datasets = {
        label: splitOnCaps(type),
        fillColor: hexToRgbA(color, 0.2),
        strokeColor: color,
        pointColor: color,
        pointStrokeColor: "#fff",
        pointHighlightFill: hexToRgbA(color, 0.9),
        pointHighlightStroke: color,
        data: data
      };

      var linedata = {
        labels: labels,
        datasets: [datasets]
      };

      if(!!secondary){
        rrData = rrData.reduce(
        function(a, b) {
          return a.concat(b);
        },[]);

        let rrDataset = {
          label: splitOnCaps(secondary),
          fillColor: hexToRgbA('#e0f2f1', 0.2),
          strokeColor: '#e0f2f1',
          pointColor: '#e0f2f1',
          pointStrokeColor: "#00695c",
          pointHighlightFill: hexToRgbA('#00695c', 0.7),
          pointHighlightStroke: hexToRgbA('#00695c', 0.9),
          data: rrData
        };

        linedata.datasets.push(rrDataset);
      }

      //the rendered canvas element max-width is 100%
      //on screen resize, screen sizes less than the width set here, the pointer events get thrown off, on larger screens the chart stays small
      //adding on a width based on parent element size might be best? would eventually get too small I think
      
      return (<div className="col s12 m12 l6 x6"><h4>{heading}</h4><Linechart data={linedata} height="400" /></div>);
    }
  }

  //render the App
  render() {
    //try to keep render free of data manipulation and loops.
    //this keeps it clean and true to it's name of rendering only.

    return (
      <div className="App blue lighten-5">
        <header className="flex-container App-header">
          <h1>Users</h1>
          <ul className="row">
            <li className="col s4"><button onClick={this.changeUser} className="btn btn-floating" title="User 1" data-id="1" ><i className="material-icons">assignment_ind</i></button></li>
            <li className="col s4"><button onClick={this.changeUser} className="btn btn-floating lime" title="User 2" data-id="2" ><i className="material-icons">assignment_ind</i></button></li>
            <li className="col s4"><button onClick={this.changeUser} className="btn btn-floating red darken-3" title="User 3" data-id="3" ><i className="material-icons">assignment_ind</i></button></li>
          </ul>
        </header>
        <div id="content" className="flex-container">
          <div className="card-panel blue lighten-2">
            <div className="row">
              { this.createPieCharts() }
            </div>
            <div className="row">
              { this.createLineChart('heartRate', 'HR & Breathing over 3 Nights', '#3f51b5', 'respiratoryRate') }
              { this.createLineChart('tempBedC', 'Beds & Room Temps over 3 Nights', '#3f51b5', 'tempRoomC') }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
