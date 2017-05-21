import React from 'react';
import './FlexContainer.css';

export default class FlexContainer extends React.Component {

  render () {
    let classNames = ['FlexContainer'];
    if (this.props.flexDirection === 'row') {
      classNames.push('FlexContainer-Row');
    }
    if (this.props.fill) {
      classNames.push('FlexContainer-Fill');
    }

    return (<div className={classNames.join(' ')}>
      {this.props.children}
    </div>);
  }
}
