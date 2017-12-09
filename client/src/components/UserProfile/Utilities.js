import {DefaultInterface} from '../../Utilities'

const initializeData = () => {
    const storageUser = JSON.parse(localStorage.getItem('user')) || {firstName: "", lastName: ""}
    const storageAddress = JSON.parse(localStorage.getItem('address')) || {city: "", state: "", zip: ""}

    const userData = {
      firstName: storageUser.firstName,
      lastName: storageUser.lastName
    }

    const addressData = {
      city: storageAddress.city,
      state: storageAddress.state,
      zip: storageAddress.zip
    }

    const initData =  {
      profileData: {
        user: userData,
        address: addressData
      },
      validated: {
        user: {},
        address: {}
      },
      id: {
        userId: storageUser.userId || "",
        addressId: storageAddress.addressId || ""
      }
    }

    for(const key in userData){
      initData.validated.user[key] = validateField(userData[key])
    }

    for(const key in addressData){
      initData.validated.address[key] = validateField(addressData[key])
    }

    return initData
}

// Validates individual field
const validateField = (text) => {
  if(/^[0-9a-zA-Z]+$/.test(text) && text.length > 0){
    return true
  }
  return false
}

const resetField = (context,type) => {
  const profileData = context.state.profileData
  const validated = context.state.validated
  Object.keys(profileData[type]).forEach(key => {
    profileData[type][key] = ""
    validated[type][key] = false
  })

  context.setState({profileData: profileData, validated: validated})
}

// Parses object jey for form label creation
const parseTitle = (title) => {
  const newTitle = title.split(/(?=[A-Z])/).join(" ")
  return newTitle.charAt(0).toUpperCase() + newTitle.slice(1)
}

// Execute A -> B if A and B.
const bundleFunc = (funcA, funcB, ...args) => {
  funcA.apply(this, args)
  funcB.apply(this, args)
}

const SubmitUser = (context, userData, submitAddress) => {
  context.props.mutateUser({variables: {...userData}})
    .then((response) => {
      const user = response.data.AddNewUser.User
      const address = context.state.profileData.address
      const profileData = {
        user: {firstName: user.FirstName, lastName: user.LastName},
        address: address
      }
      context.setState({profileData: profileData, id: {userId: user.UserId, addressId: context.state.id.addressId}})
      context.props.setUser({userId: user.UserId, ...profileData.user})
      if(submitAddress && preSubmitValidate(context, profileData, 'address')){
        SubmitAddress(context, user.UserId)
      }
    })
}

const SubmitAddress = (context, userId) => {
  const address = context.state.profileData.address
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/addressql')

  context.props.mutateAddress({variables: {userid: userId, ...address}})
    .then((response) => {
      const user = context.state.profileData.user
      const address = response.data.AddNewAddress.Address
      const profileData = {
        user: user,
        address: {city: address.City, state: address.State, zip: address.Zip
      }}
      context.setState({profileData: profileData, id: {userId: context.state.id.userId, addressId: address.AddressId}})
      context.props.setAddress({addressId: context.state.id.addressId, ...profileData.address})
    })
}

//
const EditUser = (context, userData, submitAddress) => {
  context.props.mutateExistingUser({variables: {userid: context.state.id.userId,...userData}})
    .then((response) => {
      const user = response.data.UpdateUserById.User
      const address = context.state.profileData.address
      const profileData = {
        user: {firstName: user.FirstName, lastName: user.LastName},
        address: address
      }

      context.setState({profileData: profileData, id: {userId: user.UserId, addressId: context.state.id.addressId}})
      context.props.setUser({userId: user.UserId, ...profileData.user})

      if(submitAddress && !context.state.id.addressId.length > 0 && preSubmitValidate(context, profileData, 'address')){
        SubmitAddress(context, user.UserId)
      }
      else if (submitAddress && preSubmitValidate(context, profileData, 'address')) {
        EditAddress(context, user.UserId)
      }
    })
}

const EditAddress = (context, userId) => {
  const address = context.state.profileData.address
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/addressql')

  context.props.mutateExistingAddress({variables: {addressid: context.state.id.addressId, userid: userId, ...address}})
    .then((response) => {
      const user = context.state.profileData.user
      const address = response.data.UpdateAddressById.Address
      const profileData = {
        user: user,
        address: {city: address.City, state: address.State, zip: address.Zip
      }}
      context.setState({profileData: profileData, id: {userId: context.state.id.userId, addressId: address.AddressId}})
      context.props.setAddress({addressId: address.AddressId, ...profileData.address})
    })
}

const submitData = (context, submitAddress) => {
  const data = context.state.profileData
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/userql')
  if(!context.state.id.userId.length > 0 && preSubmitValidate(context, data, 'user')){

    SubmitUser(context, data.user, submitAddress)
  }
  else if(preSubmitValidate(context, data, 'user')){
    EditUser(context, data.user, submitAddress)
  }
}

const preSubmitValidate = (context, data, type) => {

  for(const key in data[type]){
    if(data[type][key].length <= 0 || !validateField(data[type][key])){
      const validated = context.state.validated
      validated[type][key] = false

      context.setState({error: false, validated: validated})
      return false
    }
  }

  return true
}

export {validateField, parseTitle, bundleFunc, submitData, resetField, initializeData}
