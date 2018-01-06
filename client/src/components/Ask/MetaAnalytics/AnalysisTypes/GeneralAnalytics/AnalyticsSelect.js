import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Icon} from 'react-fa'
import {Link} from 'react-router-dom'

const AnalyticsSelect = (props) =>
  <Col md={1} onClick={() => props.selectAnalytics()} style={{cursor: 'pointer'}}>
  {
    props.showAnalytics ?
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

export default AnalyticsSelect
