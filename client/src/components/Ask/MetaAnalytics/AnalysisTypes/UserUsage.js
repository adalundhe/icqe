import React, {Component} from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'
import {withApollo } from 'react-apollo'
import {topUserTags, topTagsByTime} from '../Utilities'

class UserUsageContainer extends Component{
  state = {
    topUserTags: [],
    topTagsByTime: []
  }
  componentDidMount = () => {
    topUserTags(this,10)
    topTagsByTime(this, 10)
  }
  render(){
    return(
      <div style={AnalyticsStyle.analyticsBlock}>

      </div>
    )
  }
}

export default TransitionComponent(withApollo(UserUsageContainer))
