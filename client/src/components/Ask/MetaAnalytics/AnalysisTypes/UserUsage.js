import React, {Component} from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'
import {withApollo } from 'react-apollo'
import {topUserTags, topTagsByTime} from '../Utilities'
import {TopUserTagsChart, RecentUserTagsChart} from './UserAnalyticsVisualizations'
import {RelevantQuestionsList, LoadingQuestions} from './GeneralAnalytics'
import {Col, Row} from 'react-bootstrap'
import {Icon} from 'react-fa'

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
    this.loadData()
  }
  loadData = () => {
    this.setState({loaded: false, questionsLoaded: false})
    topUserTags(this,10)
    topTagsByTime(this, 10)
  }
  render(){
    return(
      <div style={AnalyticsStyle.analyticsBlock}>
      { this.state.loaded ?
        <div >
          <Row style={{marginTop: "1em", fontSize: '0.6em', color: "rgba(0,0,0,0.6)", fontFamily: "sans-serif", textTransform: "lowercase", cursor: "pointer", letterSpacing: "0.1em"}}>
            <Col md={1} onClick={() => this.loadData()} >
              {
                this.state.questionsLoaded ?
                <div>
                  <Icon name="refresh" style={{marginRight: '1em'}} />
                  Refresh
                </div>
                :
                <div>
                  <Icon name="spinner" style={{marginRight: '1em'}} />
                  Loading
                </div>
              }

            </Col>
          </Row>
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
