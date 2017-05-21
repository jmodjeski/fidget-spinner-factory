import React from 'react';
import './Designer.css';

export default class Designer extends React.Component {

  componentDidMount () {
    let {dispatch} = this.props.store;
    dispatch({
      type: 'REGISTER_CANVAS',
      payload: this.canvas
    });
  }

  componentWillUnmount () {
    let {dispatch} = this.props.store;
    dispatch({
      type: 'DEREGISTER_CANVAS',
      payload: this.canvas
    });
  }


  render () {
    return (<div className='Designer'>
      <canvas ref={(target) => this.canvas = target} />
    </div>);
  }
}


