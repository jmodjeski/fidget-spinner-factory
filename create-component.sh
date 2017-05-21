#!/bin/sh

mkdir src/components/$1

echo  "
.$1 {

}" > src/components/$1/$1.css

echo  "import React from 'react';
import './$1.css';

export default class $1 extends React.Component {

  render () {
    return (<div className='$1'></div>);
  }
}" > src/components/$1/$1.js

echo  "import $1 from './$1.js';

export default $1;" > src/components/$1/index.js
