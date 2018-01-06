import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Icon} from 'react-fa'
import {Distance} from '../Visualizations'
import {colStyleTwo, barContainer, relevanceBar, textStyleTopBar} from '../LocalStyles/ResponseStyles'


const DistanceBar = (props) => {
  console.log("PROPS",props.distance)
  return(
    <Col md={5}  style={colStyleTwo}>
      <Row>
        <p style={textStyleTopBar}>Distance: </p>
      </Row>
      <Row style={barContainer}>
        <Distance distance={props.distance.distance} />
      </Row>
    </Col>
  )
}


export default DistanceBar
