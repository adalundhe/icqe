import React, {Component} from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'
import {withApollo } from 'react-apollo'
import {tagsByUserTime, topNewestTags} from '../Utilities'

class CommunityUsageContianer extends Component{
  render(){
    return(
      <div style={AnalyticsStyle.analyticsBlock}>
        Community Analytics
      </div>
    )
  }
}

export default TransitionComponent(withApollo(CommunityUsageContianer))
