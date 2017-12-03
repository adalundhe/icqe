import React, {Component} from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'
import {withApollo } from 'react-apollo'
import {tagsByUserTime, topNewestTags} from '../Utilities'
import TopNewestTagsChart from './CommunityAnalyticsVisualizations/TopNewestTagsChart'

class CommunityUsageContianer extends Component{
  state = {
    topNewestTags: [],
    loaded: false
  }
  componentDidMount = () => {
    console.log("LOADED")
    topNewestTags(this, 25)
  }
  render(){
    console.log(this.state.loaded)
    return(
      <div style={AnalyticsStyle.analyticsBlock}>
        {
          this.state.loaded ?
          <TopNewestTagsChart topNewestTags={this.state.topNewestTags} />
          :
          null
        }
      </div>
    )
  }
}

export default TransitionComponent(withApollo(CommunityUsageContianer))
