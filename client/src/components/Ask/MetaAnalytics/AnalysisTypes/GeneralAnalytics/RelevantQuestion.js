import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Relevance} from '../../../Visualizations'
import {Icon} from 'react-fa'
import {containerStyleTwo, rowStyle, colStyle, colStyleThree, colItem, textStyleTopThree,
        textStyleTopTwo, textStyleBottomTwo, linkStyle, spanStyle, barContainer,
        relevanceBar} from '../../../LocalStyles/ResponseStyles'

let newStyle = {...containerStyleTwo, display: 'flex', alignSelf: 'center'}

const RelevantQuestion = (props) =>
<div style={newStyle}>
  <Row style={rowStyle}>
    <Col md={6} style={colStyle}>
      <h3 style={textStyleTopTwo}>{props.body}</h3>
      <p style={textStyleBottomTwo}><a style={linkStyle} href={props.linkto}>{props.linkto}</a></p>
    </Col>
    <Col md={6}  style={colStyleThree}>
      <Row>
        <p style={textStyleTopThree}>Similarity: {(parseFloat(props.similarity) * 100).toFixed(2)}%</p>
      </Row>
      <Row style={barContainer}>
        <Relevance style={relevanceBar} data={parseFloat(props.similarity)} size={100} width={100} height={25} />
      </Row>
    </Col>
  </Row>
</div>


export default RelevantQuestion
