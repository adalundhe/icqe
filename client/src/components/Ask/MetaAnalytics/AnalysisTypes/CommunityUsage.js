import React, {Component} from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'
import {withApollo } from 'react-apollo'
import {tagsByUserTime, topNewestTags, topCommunityTags} from '../Utilities'
import {TopNewestTagsChart, TopCommunityTagsChart} from './CommunityAnalyticsVisualizations'
import {RelevantQuestionsList, LoadingQuestions} from './GeneralAnalytics'
import {Col, Row} from 'react-bootstrap'
import {Icon} from 'react-fa'

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
    this.loadData()
  }
  loadData = () => {
    this.setState({loaded: false, questionsLoaded: false})
    topCommunityTags(this, 10)
    topNewestTags(this, 10)
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
          <div style={{borderBottom: 'solid', borderWidth: 'thin', borderColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-around'}}>
            <div style={{marginTop: '2em', width: '50%'}}>
              <TopCommunityTagsChart topCommunityTags={this.state.topCommunityTags} range={this.state.range} />
            </div>
            {
              this.state.questionsLoaded ?
              <div  style={{marginTop: '2em', marginBottom: '3em', width: '50%'}}>
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
