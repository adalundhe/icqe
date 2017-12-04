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
    loaded: false,
    range: 0
  }
  componentDidMount = () => {
    topUserTags(this,10)
    topTagsByTime(this, 10)
  }
  render(){
    return(
      <div style={AnalyticsStyle.analyticsBlock}>
      { this.state.loaded ?
        <div >
          <div style={{borderBottom: 'solid', borderWidth: 'thin', borderColor: 'rgba(0,0,0,0.3)'}}>
            <TopUserTagsChart topUserTags={this.state.topUserTags} range={this.state.range} />
          </div>
          <div>
            <RecentUserTagsChart topTagsByTime={this.state.topTagsByTime} range={this.state.range}/>
          </div>
        </div>
        :
        null
      }
      </div>
    )
  }
}

export default TransitionComponent(withApollo(UserUsageContainer))
