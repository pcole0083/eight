import React, { Component } from 'react';
import {Pie} from 'react-chartjs';

//this is a wrapper around reach charts Pie.
//this is setup so if there is time to add a store it can be
class Piechart extends Component {
  constructor(props) {
    super(props);

    this.state = { data: props.data };
  }

  componentWillReceiveProps(nextProps){
  	this.setState({ data: nextProps.data });
  }

  render() {
  	return <Pie data={this.props.data} options={this.props.options} width={this.props.width} height={this.props.height} />
  }
}
 
export default Piechart;
