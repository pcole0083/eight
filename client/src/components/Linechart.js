import React, { Component } from 'react';
import {Line} from 'react-chartjs';

//this is a wrapper around reach charts Line.
//this is setup so if there is time to add a store it can be
class Linechart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      width: this.calculateWidth()
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({ data: nextProps.data });
  }

  componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }

  //these calc is based upon half width on lg and x and 100% on m and s.
  calculateWidth = () => {
    var _width = 600; //max-width
    var wrapperSize = window.innerWidth - (34.5*2);
    if(wrapperSize < _width){
      _width = wrapperSize; //subtract padding of wrappers
    }
    return _width;
  }

  updateDimensions = () => {
    //should include a debounce
    var new_width = this.calculateWidth();
    this.setState({data: this.state.data, width: new_width});
  }

  //the resize method does not really seem to work. The style width and height are updated but not the canvas width and height
  render() {
    return <Line data={this.props.data} options={this.props.options} width={this.state.width} height={this.state.width} />
  }
}
 
export default Linechart;
