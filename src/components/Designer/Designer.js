import React from 'react';
import './Designer.css';

export default class Designer extends React.Component {

  componentDidMount () {
    let {dispatch} = this.props.store;
    dispatch({
      type: 'REGISTER_DESIGNER',
      payload: this.canvas
    });
  }

  componentWillUnmount () {
    let {dispatch} = this.props.store;
    dispatch({
      type: 'DEREGISTER_DESIGNER',
      payload: this.canvas
    });
  }

  onWheel = (e) => {
    e.preventDefault();
  }

  render () {
    return (<div className='Designer'>
      <canvas onWheel={this.onWheel} ref={(target) => this.canvas = target} />
    </div>);
  }
}


