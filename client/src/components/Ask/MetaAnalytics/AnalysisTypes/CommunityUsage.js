import React, {Component} from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'
import {withApollo } from 'react-apollo'
import {tagsByUserTime, topNewestTags, topCommunityTags} from '../Utilities'
import {TopNewestTagsChart, TopCommunityTagsChart} from './CommunityAnalyticsVisualizations'
import {RelevantQuestionsList, LoadingQuestions} from './GeneralAnalytics'

class CommunityUsageContianer extends Component{
  state = {
    topNewestTags: [],
    topCommunityTags: [],
    relevantQuestions: [],
    loaded: false,
    questionsLoaded: false,
    range: 0
  }
  componentDidMount = () => {
    topCommunityTags(this, 10)
    topNewestTags(this, 10)
  }
  render(){
    return(
      <div style={AnalyticsStyle.analyticsBlock}>
      { this.state.loaded ?
        <div >
          <div style={{borderBottom: 'solid', borderWidth: 'thin', borderColor: 'rgba(0,0,0,0.3)', display: 'flex'}}>
            <TopCommunityTagsChart topUserTags={this.state.topCommunityTags} range={this.state.range} />
            {
              this.state.questionsLoaded ?
              <div  style={{marginTop: '2em', marginBottom: '3em'}}>
                <RelevantQuestionsList relevantQuestions={this.state.relevantQuestions} />
              </div>
              :
              <div style={{textAlign: 'center', width: '50%', textAlign: 'center', marginTop: '12em'}}>
                <LoadingQuestions />
              </div>
            }
          </div>
          <div >
            <TopNewestTagsChart topTagsByTime={this.state.topNewestTags} range={this.state.range}/>
          </div>
        </div>
        :
        null
      }
      </div>
    )
  }
}

export default TransitionComponent(withApollo(CommunityUsageContianer))
