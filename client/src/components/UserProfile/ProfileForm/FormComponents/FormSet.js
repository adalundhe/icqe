import React from 'react'
import {StandardFormBlock, SelectedFormBlock, ValidFormBlock, ErrorFormBlock} from './FormBlock'

const FormSet = (props) => {
  if(props.currentVal.length === 0){
    return(<StandardFormBlock validate={props.validate} type={props.type}
            currentVal={props.currentVal}
            onFieldChange={props.onFieldChange} label={props.label}
            valid={props.valid} field={props.field} />)
  }
  if (props.selected) {
    return(<SelectedFormBlock validate={props.validate} type={props.type} onFieldChange={props.onFieldChange}
            currentVal={props.currentVal}
            label={props.label} valid={props.valid}  field={props.field} />)
  }
  if(props.valid){
    return(<ValidFormBlock validate={props.validate} type={props.type}
             currentVal={props.currentVal}
             onFieldChange={props.onFieldChange} label={props.label} valid={props.valid}  field={props.field} />)
  }
  else if(!props.valid){
    return(<ErrorFormBlock validate={props.validate} type={props.type}
             currentVal={props.currentVal}
             onFieldChange={props.onFieldChange} label={props.label} valid={props.valid}  field={props.field} />)
  }
}

export default FormSet
