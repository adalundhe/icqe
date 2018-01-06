import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Icon} from 'react-fa'
import {Relevance} from '../Visualizations'
import {colStyleTwo, barContainer, relevanceBar, textStyleTopBar} from '../LocalStyles/ResponseStyles'


const SimilarityBar = (props) =>
  <Col md={5}  style={colStyleTwo}>
    <Row>
      <p style={textStyleTopBar}>Similarity: {(parseFloat(props.similarity) * 100).toFixed(2)}%</p>
    </Row>
    <Row style={barContainer}>
      <Relevance style={relevanceBar} data={props.similarity} size={100} width={100} height={25} />
    </Row>
  </Col>

export default SimilarityBar
