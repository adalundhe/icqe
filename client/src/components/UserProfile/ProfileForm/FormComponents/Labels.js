import React from 'react'
import {ValidIcon, InvalidIcon} from './ValidationIcons'

const StandardFormLabel = (props) => {
  return(
    <div>
      <label>{props.label}</label>
      <ValidIcon valid={props.valid} />
    </div>
  )
}

const SelectedFormLabel = (props) =>
  <div>
    <label>{props.label}</label>
    <ValidIcon valid={props.valid} />
  </div>

const ErrorFormLabel = (props) =>
  <div>
    <label>{props.label}</label>
    <InvalidIcon valid={props.valid} />
  </div>

export {StandardFormLabel, SelectedFormLabel, ErrorFormLabel}
