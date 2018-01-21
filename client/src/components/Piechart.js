import React, { Component } from 'react';
import {Pie} from 'react-chartjs';

class Piechart extends Component {
  constructor(props) {
    super(props);

    this.state = { data: props.intervals };
  }

  componentWillReceiveProps(nextProps){
  	this.setState({ data: nextProps.intervals });
  }

  render() {
  	return <Pie data={this.props.data} options={this.props.data} width={this.props.width} height={this.props.height} />
  }
}
 
export default Piechart;
