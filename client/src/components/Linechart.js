import React, { Component } from 'react';
import {Line} from 'react-chartjs';

class Linechart extends Component {
  constructor(props) {
    super(props);

    this.state = { data: props.intervals };
  }

  componentWillReceiveProps(nextProps){
    this.setState({ data: nextProps.intervals });
  }

  render() {
    return <Line data={this.props.data} options={this.props.data} width={this.props.width} height={this.props.height} />
  }
}
 
export default Linechart;
