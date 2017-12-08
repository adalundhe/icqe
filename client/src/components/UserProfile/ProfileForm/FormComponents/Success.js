import React from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {successStyle} from './FormComponentStyles'

const Success = () =>
  <div>
    <h1 style={successStyle}>profile updated</h1>
  </div>

export default TransitionComponent(Success)
