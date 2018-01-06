import React from 'react'
import {inverseColorByDistLT} from './ColorMaps'

const DistanceCoded = (props) =>
  <div style={{fontSize: '2em', color: inverseColorByDistLT(props.distance),
  fontFamily: 'sans-serif', textTransform: 'lowercase', letterSpacing: '0.1em'}}>
    {props.distance} mi.
  </div>

export default DistanceCoded
