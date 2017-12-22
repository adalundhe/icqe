import React, {Component} from 'react'
import {TransitionComponent} from '../../Helpers/TransitionHoc'
import {DefaultInterface} from '../../../Utilities'
import NavBar from './AnalyticsNavigation/NavBarContainer'
import {Switch} from 'react-router-dom'
import {PrivateRoute} from '../../../Auth/PrivateRoute'
import {UserUsage, CommunityUsage} from './AnalysisTypes'
import {AnalyticsStyle} from '../LocalStyles/AnalyticsStyles'
import {GeoserviceSelect} from './AnalysisTypes/Geolocation'
import {AnalyticsSelect} from './AnalysisTypes/GeneralAnalytics'
import {Row} from 'react-bootstrap'


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
          <div style={{display: "flex"}}>
            <AnalyticsSelect showAnalytics={this.props.showAnalytics} selectAnalytics={this.props.selectAnalytics}  />
            <GeoserviceSelect showAnalytics={this.props.showAnalytics} selectGeoanalytics={this.props.selectGeoanalytics} geoanalyticsOn={this.props.geoanalyticsOn}/>
          </div>
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
