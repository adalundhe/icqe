import React from 'react'
import FormSet from './FormComponents/FormSet'
import {parseTitle, bundleFunc} from '../Utilities'
import {SetStyle, FormSegment} from './FormMainStyles'


const MainForm = (props) => {
  const formItems = Object.keys(props.userFields)
  return(
    <div>
      {
        formItems.map((item, key) => {
          const formLabel = parseTitle(item)
          return(
            <div key={key} style={SetStyle}>
              <FormSet currentVal={props.userFields[item]} type={props.type} validate={props.validate} onFieldChange={props.onFieldChange} label={formLabel} field={item} valid={props.validated[item]} />
              <input type="text"
                defaultValue={props.userFields[item]}
                style={FormSegment.inputField}
                onChange={(event) => bundleFunc(props.onFieldChange, props.validate, props.type, item, event.target.value)} />
            </div>
          )
      })
      }
    </div>
  )
}



const AddressForm = (props) => {
    const formItems = Object.keys(props.addressFields)
    return(
      <div>
        {
          formItems.map((item, key) => {
            const formLabel = parseTitle(item)
            return(
              <div key={key} style={SetStyle}>
                <FormSet currentVal={props.addressFields[item]} type={props.type} validate={props.validate} onFieldChange={props.onFieldChange} label={formLabel} field={item} valid={props.validated[item]} />
                <input type="text"
                  defaultValue={props.addressFields[item]}
                  style={FormSegment.inputField}
                  onChange={(event) => bundleFunc(props.onFieldChange, props.validate, props.type, item, event.target.value)} />
              </div>
            )
          })
        }
      </div>
    )
}


export {MainForm, AddressForm}
