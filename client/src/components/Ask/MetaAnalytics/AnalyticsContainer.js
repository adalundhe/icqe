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
    showAnalytics: false,
  }
  componentDidMount = () => {
    DefaultInterface.setInterface('http://192.168.1.2.:3000/user-profile/meta')

  }
  setVisibility = () => {
    this.setState({showAnalytics: !this.state.showAnalytics})
    this.props.selectAnalytics()
  }
  render(){
    return(
      <div style={AnalyticsStyle.container}>
        <Row style={AnalyticsStyle.showAnalyticsRow}>
          <Col md={1} onClick={() => this.setVisibility()}>
            <Link to="/ask/my-usage" style={{textDecoration: 'none', color: 'rgba(0,0,0,0.5)'}}>
              <Icon name="gear" style={{marginRight: '1em'}} />
              {
                this.state.showAnalytics ? 'Collapse analytics' : 'View analytics'
              }
            </Link>
          </Col>
          <Col md={11}>
          </Col>
        </Row>
        <Row>
        {
            this.state.showAnalytics ?
              <div>
                <NavBar/>
                <Switch>
                  <PrivateRoute path="/ask/my-usage" user={this.props.user} component={UserUsage} />
                  <PrivateRoute path="/ask/community-usage" component={CommunityUsage} />
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
