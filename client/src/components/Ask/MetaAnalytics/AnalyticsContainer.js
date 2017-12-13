import React, {Component} from 'react'
import {TransitionComponent} from '../../Helpers/TransitionHoc'
import {DefaultInterface} from '../../../Utilities'
import NavBar from './AnalyticsNavigation/NavBarContainer'
import {Switch, Link} from 'react-router-dom'
import {PrivateRoute} from '../../../Auth/PrivateRoute'
import {UserUsage, CommunityUsage} from './AnalysisTypes'
import {AnalyticsStyle} from '../LocalStyles/AnalyticsStyles'
import {Icon} from 'react-fa'
import {Col, Row} from 'react-bootstrap'

class AnalyticsContainer extends Component{
  state = {
    loaded: false,
  }
  componentDidMount = () => {
    DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/meta')

  }
  render(){
    const userData = {
      topUserTags: this.props.data.topUserTags,
      topTagsByTime: this.props.data.topTagsByTime,
      relevantUserQuestions: this.props.data.relevantUserQuestions,
      userRange: this.props.data.userRange,
      analyticsLoaded: this.props.data.analyticsLoaded,
      questionsLoaded: this.props.data.questionsLoaded
    }
    const communityData = {
      topCommunityTags: this.props.data.topCommunityTags,
      topNewestTags: this.props.data.topNewestTags,
      relevantCommunityQuestions: this.props.data.relevantCommunityQuestions,
      communityRange: this.props.data.communityRange,
      analyticsLoaded: this.props.data.analyticsLoaded,
      questionsLoaded: this.props.data.questionsLoaded
    }
    return(
      <div style={AnalyticsStyle.container}>
        <Row style={AnalyticsStyle.showAnalyticsRow}>
          <Col md={1} onClick={() => this.props.selectAnalytics()}>
          {
            this.props.showAnalytics ?
            <Link to="/ask" style={{textDecoration: 'none', color: 'rgba(0,0,0,0.5)'}}>
              <Icon name="gear" style={{marginRight: '1em'}} />
              {
                'Collapse analytics'
              }
            </Link>
            :
            <Link to="/ask/my-usage" style={{textDecoration: 'none', color: 'rgba(0,0,0,0.5)'}}>
              <Icon name="gear" style={{marginRight: '1em'}} />
              {
                'View analytics'
              }
            </Link>
          }
          </Col>
          <Col md={11}>
          </Col>
        </Row>
        <Row>
        {
            this.props.showAnalytics ?
              <div>
                <NavBar/>
                <Switch>
                  <PrivateRoute path="/ask/my-usage" user={this.props.user} {...userData} loadData={this.props.loadData} component={UserUsage} />
                  <PrivateRoute path="/ask/community-usage" {...communityData} loadData={this.props.loadData} component={CommunityUsage} />
                </Switch>
              </div>
              :
              null
        }
        </Row>
      </div>
    )
  }
}

export default TransitionComponent(AnalyticsContainer)
