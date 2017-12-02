import React from 'react'
import {StandardFormLabel, SelectedFormLabel, ErrorFormLabel} from './Labels'
import {InputBlockStyle} from './FormComponentStyles'


const StandardFormBlock = (props) =>
  <div style={InputBlockStyle.inputLabel}>
    <StandardFormLabel label={props.label} valid={props.valid} />
  </div>


const SelectedFormBlock = (props) =>
  <div style={InputBlockStyle.inputLabel}>
    <SelectedFormLabel label={props.label} valid={props.valid} />
  </div>


  const ValidFormBlock = (props) =>
    <div style={InputBlockStyle.inputLabel}>
      <StandardFormLabel label={props.label} valid={props.valid} />
    </div>

  const ErrorFormBlock = (props) =>
    <div  style={InputBlockStyle.inputLabel}>
      <ErrorFormLabel label={props.label} valid={props.valid} field={props.field} />
    </div>

export {StandardFormBlock, SelectedFormBlock, ValidFormBlock, ErrorFormBlock}
