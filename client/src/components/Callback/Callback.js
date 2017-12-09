import { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import {getUserInfo} from './Utilities'
import {userFromIdMutation} from './Queries'
import { setIdToken, setAccessToken, logout} from '../../Auth/AuthHelpers';
import {DefaultInterface} from '../../Utilities'

class Callback extends Component {
  componentDidMount() {
    try{
      setAccessToken();
      setIdToken();
      DefaultInterface.setInterface('http://'+process.env.REACT_APP_CALLBACK+'/user-profile/userql')
      getUserInfo(this)
    }
    catch(e){
      logout()
    }
    this.props.history.push("/")
  }

  render() {
    return null
  }
}

const CallbackComponent = compose(
  withApollo,
  graphql(userFromIdMutation, {
    name : 'userFromId'
  }),
)(withRouter(Callback))

export default CallbackComponent
