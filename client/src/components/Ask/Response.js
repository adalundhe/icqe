import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Relevance, Frequency} from './Visualizations'
import {ResponseHeader, SimilarityBar, DistanceBar} from './ResponseElements'
import {Icon} from 'react-fa'
import {containerStyle, rowStyle, colStyle, colStyleTwo, colItem,
        textStyleTop, textStyleBottom, linkStyle, spanStyle, barContainer,
        relevanceBar, textStyleTopBar} from './LocalStyles/ResponseStyles'

const Response = (props) => {
  return(
    <div style={containerStyle}>
      <Row style={rowStyle}>
        <ResponseHeader body={props.body} analyticsSelect={props.analyticsSelect} index={props.index} />
        {
          props.geoanalyticsOn && props.distLen > 0 ?
          <DistanceBar distance={props.distance} />
          :
          <SimilarityBar similarity={props.similarity} />
        }
      </Row>
      {
      props.showAnalytics ?
      <Row style={{...rowStyle, display: 'flex', justifyContent: 'space-around', marginLeft: '10%'}}>
        <Col md={6}>
          <Frequency similarities={props.similarities} responseSimilarity={props.similarity.toFixed(3)} />
        </Col>
      </Row> :
      null
    }
    </div>
  )
}

export default Response
