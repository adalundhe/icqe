import React, {Component} from 'react'
import {Col, Row} from 'react-bootstrap'
import {Icon} from 'react-fa'
import {Link} from 'react-router-dom'

const GeoserviceSelect = (props) =>
<div style={{marginLeft: "65%"}}>
  {
    !props.showAnalytics ?
    <Col md={1} onClick={() => props.selectGeoanalytics()}>
      {
        props.geoanalyticsOn ?
        <Col md={2} style={{textDecoration: 'none', color: '#3498DB'}}>
          <Icon name="globe" style={{marginRight: '1em'}} />
          {
            'Geoanalytics On'
          }
        </Col>
        :
        <Col md={2} style={{textDecoration: 'none', color: 'rgba(0,0,0,0.5)'}}>
          <Icon name="globe" style={{marginRight: '1em'}} />
          {
            'Geoanalytics Off'
          }
        </Col>
      }
      </Col>
      :
      null
  }
</div>

export default GeoserviceSelect
