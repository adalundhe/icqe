import React, {Component} from 'react'
import {TransitionComponent} from '../../Helpers/TransitionHoc'
import {DefaultInterface} from '../../../Utilities'
import NavBar from './AnalyticsNavigation/NavBarContainer'
import {Switch} from 'react-router-dom'
import {PrivateRoute} from '../../../Auth/PrivateRoute'
import {UserUsage, CommunityUsage} from './AnalysisTypes'
import {AnalyticsStyle} from '../LocalStyles/AnalyticsStyles'

class AnalyticsContainer extends Component{
  state = {
    loaded: false
  }
  componentDidMount = () => {
    DefaultInterface.setInterface('http://localhost:3000/user-profile/meta')

  }
  render(){
    return(
      <div style={AnalyticsStyle.container}>
        <NavBar/>
        <Switch>
          <PrivateRoute path="/ask/my-usage" user={this.props.user} component={UserUsage} />
          <PrivateRoute path="/ask/community-usage" component={CommunityUsage} />
        </Switch>
      </div>
    )
  }
}

export default TransitionComponent(AnalyticsContainer)
