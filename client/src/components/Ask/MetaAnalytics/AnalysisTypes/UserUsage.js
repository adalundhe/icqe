import React, {Component} from 'react'
import {TransitionComponent} from '../../../Helpers/TransitionHoc'
import {AnalyticsStyle} from '../../LocalStyles/AnalyticsStyles'
import {TopUserTagsChart, RecentUserTagsChart} from './UserAnalyticsVisualizations'
import {RelevantQuestionsList, LoadingQuestions} from './GeneralAnalytics'
import {Col, Row} from 'react-bootstrap'
import {Icon} from 'react-fa'

const UserUsageContainer = (props) =>
      <div style={AnalyticsStyle.analyticsBlock}>
      { props.analyticsLoaded ?
        <div>
        { props.topUserTags.length > 0 || props.topTagsByTime > 0 ?
            <div>
              <Row style={{marginTop: "1em", fontSize: '0.6em', color: "rgba(0,0,0,0.6)", fontFamily: "sans-serif", textTransform: "lowercase", cursor: "pointer", letterSpacing: "0.1em"}}>
                <Col md={1} onClick={() => props.loadData()} >
                  {
                    props.questionsLoaded ?
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
                  <TopUserTagsChart topUserTags={props.topUserTags} range={props.userRange} />
                </div>
                {
                  props.questionsLoaded && props.relevantUserQuestions.length > 0 ?
                  <div  style={{marginTop: '2em', marginBottom: '3em', width: '50%'}}>
                    <RelevantQuestionsList relevantQuestions={props.relevantUserQuestions} />
                  </div>
                  :
                  <div style={{textAlign: 'center', width: '50%', textAlign: 'center', marginTop: '12em'}}>
                    <LoadingQuestions />
                  </div>
                }
              </div>
              <div >
                <RecentUserTagsChart topTagsByTime={props.topTagsByTime} range={props.userRange}/>
              </div>
            </div>
            :
            <h1 style={{textAlign: 'center', fontFamily: 'sans-serif', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', textTransform: 'lowercase'}}>
            {
              "you haven't asked any questions yet!"
            }
            </h1>
        }
        </div>
        :
        null
      }
      </div>

export default TransitionComponent(UserUsageContainer)
