import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Relevance, Frequency} from './Visualizations'
import {Icon} from 'react-fa'
import {containerStyle, rowStyle, colStyle, colStyleTwo, colItem,
        textStyleTop, textStyleBottom, linkStyle, spanStyle, barContainer,
        relevanceBar} from './LocalStyles/ResponseStyles'

const Response = (props) => {
  return(
    <div style={containerStyle}>
      <Row style={rowStyle}>
        <Col md={1} style={colItem}>
          <Icon style={spanStyle} name='gear' onClick={() => props.analyticsSelect(props.index)}/>
        </Col>
        <Col md={6} style={colStyle}>
          <h3 style={textStyleTop}>{props.body}</h3>
          <p style={textStyleBottom}><a style={linkStyle} href={props.linkto}>{props.linkto}</a></p>
        </Col>
        <Col md={5}  style={colStyleTwo}>
          <Row>
            <p style={textStyleTop}>Similarity: {(parseFloat(props.similarity) * 100).toFixed(2)}%</p>
          </Row>
          <Row style={barContainer}>
            <Relevance style={relevanceBar} data={props.similarity} size={100} width={100} height={25} />
          </Row>
        </Col>
      </Row>
      {
      props.showAnalytics ?
      <Row style={rowStyle}>
        <Col md={1} style={colItem}>
        </Col>
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
