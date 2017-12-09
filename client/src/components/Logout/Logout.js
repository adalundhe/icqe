import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {logout} from '../../Auth/AuthHelpers';

class Logout extends Component{
  componentDidMount = () => {
    logout()
    this.props.history.push("/")
  }
  render(){
    return null
  }
}

export default withRouter(Logout)
