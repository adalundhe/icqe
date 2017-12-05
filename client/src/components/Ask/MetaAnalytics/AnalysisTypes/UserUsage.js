import React, {Component} from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'
import {withApollo } from 'react-apollo'
import {topUserTags, topTagsByTime, relevantQuestions} from '../Utilities'
import {TopUserTagsChart, RecentUserTagsChart} from './UserAnalyticsVisualizations'
import {RelevantQuestionsList, LoadingQuestions} from './GeneralAnalytics'

class UserUsageContainer extends Component{
  state = {
    topUserTags: [],
    topTagsByTime: [],
    relevantQuestions: [],
    loaded: false,
    questionsLoaded: false,
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
          <div style={{borderBottom: 'solid', borderWidth: 'thin', borderColor: 'rgba(0,0,0,0.3)', display: 'flex'}}>
            <TopUserTagsChart topUserTags={this.state.topUserTags} range={this.state.range} />
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
