import React from 'react'
import {ButtonStyle} from './FormComponentStyles'

const StandardButton = (props) =>
  <div>
    <button disabled={!props.disabled} type="button" style={ButtonStyle.stdButton} >Submit</button>
  </div>

const SubmitButton = (props) =>
  <div>
    <button type="button" style={ButtonStyle.submitButton} onClick={() => props.exit(props.submitForm(props.submitAddress))}>Submit</button>
  </div>

const ErrorButton = (props) =>
  <div>
    <button disabled={!props.disabled} type="button" style={ButtonStyle.errorButton} >Submit</button>
  </div>

export {SubmitButton, ErrorButton, StandardButton}
