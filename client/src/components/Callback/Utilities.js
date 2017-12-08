import uuid from 'uuid-1345'
import {getAccessToken,auth} from '../../Auth/AuthHelpers'
import {getUserInfoQuery, getUserAddressQuery} from './Queries'
import {DefaultInterface} from '../../Utilities'

const getUserInfo = (context) => {
  auth.client.userInfo(getAccessToken(),(err, res) => {
    const idFromEmail = uuid.v5({
      namespace: uuid.namespace.url,
      name: res.name
    })

    context.props.client.query({
      query: getUserInfoQuery,
      variables: {tokenId: idFromEmail}
    })
      .then(response => {
        const responseData = response.data.GetUserInfo.User
        const user = {userId: responseData.UserId, firstName: responseData.FirstName, lastName: responseData.LastName}
        getUserAddress(context, user.userId)
        context.props.setUser(user)
        localStorage.setItem('user',JSON.stringify(user))
      })
      .catch(err => {
        userFromId(context, res.name)
      })
  });
}

const getUserAddress = (context, userId) => {
  DefaultInterface.setInterface('http://192.168.1.2/user-profile/addressql')
  context.props.client.query({
    query: getUserAddressQuery,
    variables: {userId: userId}
  })
    .then(response => {
      const responseData = response.data.GetUserAddress.Address
      const address = {addressId: responseData.AddressId, city: responseData.City, state: responseData.State, zip: responseData.Zip}
      context.props.setAddress(address)
      localStorage.setItem('address',JSON.stringify(address))

    })
    .catch(err => {
      console.log('Address not found:', err)
    })
}

const userFromId = (context, email) => {
  const tokenId = uuid.v5({
    namespace: uuid.namespace.url,
    name: email
  }).toString()

  context.props.userFromId({variables: {tokenId: tokenId}})
    .then(response => {
      const user = response.data.UserFromId.User
      context.props.setUser({userId: user.UserId, firstName: user.FirstName, lastName: user.LastName})
    })
}

export {userFromId, getUserInfo}
