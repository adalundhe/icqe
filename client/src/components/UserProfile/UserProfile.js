import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo'
import {validateField, submitData, initializeData} from './Utilities'
import Success from './ProfileForm/FormComponents/Success'
import {mutateUser, mutateAddress, mutateExistingUser, mutateExistingAddress} from './Queries'
import FormControl from './ProfileForm/FormControl'

class UserProfile extends Component{
  state = {
    profileData: {
      user: {},
      address: {}
    },
    validated: {},
    id: {},
    showAddressForm: false,
    error: true,
    loaded: false,
    submitted: false,
  }
  componentDidMount = () => {
    const initData = initializeData()
    this.setState({profileData: initData.profileData, validated: initData.validated, id: initData.id, loaded: true})
  }
  onFieldChange = (type,field,val) => {
    const profileData = this.state.profileData
    profileData[type][field] = val
    this.setState({profileData})
  }
  showAddressOption = () => {
    const showAddressForm = !this.state.showAddressForm
    this.setState({showAddressForm})
  }
  validate = (type,field, val) => {
    const validated = this.state.validated
    validated[type][field] = validateField(val)
    this.setState({validated, error: validated[type][field]})
  }
  submitForm = (submitAddress) => {
    submitData(this, submitAddress)
    this.setState({submitted: true})
    setTimeout(() => {
      this.setState({submitted: false})
    },2000)


  }
  render(){
    const methods = {
      onFieldChange: this.onFieldChange,
      showAddressOption: this.showAddressOption,
      validate: this.validate,
      submitForm: this.submitForm
    }
    return(
      <div>
      {
          this.state.submitted ? <Success /> : this.state.loaded ? <FormControl {...this.state} {...methods} /> : null
      }
      </div>
    )
  }
}

const UserProfileComponent = compose(
  graphql(mutateUser, {
    name : 'mutateUser'
  }),
  graphql(mutateAddress, {
    name: 'mutateAddress'
  }),
  graphql(mutateExistingUser, {
    name: 'mutateExistingUser'
  }),
  graphql(mutateExistingAddress, {
    name: 'mutateExistingAddress'
  })
)(UserProfile)

export default UserProfileComponent
