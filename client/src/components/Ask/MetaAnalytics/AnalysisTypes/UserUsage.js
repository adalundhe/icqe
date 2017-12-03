import React, {Component} from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'
import {withApollo } from 'react-apollo'
import {topUserTags, topTagsByTime} from '../Utilities'
import TopUserTagsChart from './UserAnalyticsVisualizations/TopUserTagsChart'
import RecentUserTagsChart from './UserAnalyticsVisualizations/RecentUserTagsChart'

class UserUsageContainer extends Component{
  state = {
    topUserTags: [],
    topTagsByTime: [],
    loaded: false
  }
  componentDidMount = () => {
    topUserTags(this,10)
    topTagsByTime(this, 10)
  }
  render(){
    return(
      <div style={AnalyticsStyle.analyticsBlock}>
      { this.state.loaded ?
        <div>
          <TopUserTagsChart topUserTags={this.state.topUserTags} />
          <RecentUserTagsChart topTagsByTime={this.state.topTagsByTime} />
        </div>
        :
        null
      }
      </div>
    )
  }
}

export default TransitionComponent(withApollo(UserUsageContainer))
