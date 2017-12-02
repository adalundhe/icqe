import React from 'react'
import {MainForm, AddressForm} from './FormTypes'
import {AddressSelect} from './OptionComponents/AddressSelect'
import {MainStyle} from './FormMainStyles'
import {SubmitButton, ErrorButton} from './FormComponents/Button'
import {TransitionComponent} from '../../Helpers/TransitionHoc'

const FormControl = (props) =>
    <div style={MainStyle.mainContainer}>
      <div style={MainStyle.subContainer}>
        <MainForm type={'user'} validate={props.validate} onFieldChange={props.onFieldChange} userFields={props.profileData.user} validated={props.validated.user} />
        <AddressSelect showAddressOption={props.showAddressOption} />
      </div>
      {
        props.showAddressForm ?
          <div style={MainStyle.subContainer}>
            <AddressForm type={'address'} validate={props.validate} onFieldChange={props.onFieldChange} addressFields={props.profileData.address} validated={props.validated.address} />
          </div>
          :
          null
      }
      <div style={MainStyle.buttonContainer}>
      {
        props.error ?
        <SubmitButton exit={props.exit} disabled={props.error} submitForm={props.submitForm} submitAddress={props.showAddressForm}/>
        :
        <ErrorButton />
      }
      </div>
    </div>


  export default TransitionComponent(FormControl)
