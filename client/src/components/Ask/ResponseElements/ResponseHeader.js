import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Icon} from 'react-fa'
import {containerStyle, rowStyle, colStyle, colItem,
        textStyleTop, textStyleBottom, linkStyle, spanStyle} from '../LocalStyles/ResponseStyles'


const ResponseHeader = (props) =>
  <div style={{width: '60%', display: 'flex'}}>
    <Col md={1} style={colItem}>
      <Icon style={spanStyle} name='gear' onClick={() => props.analyticsSelect(props.index)}/>
    </Col>
    <Col md={6} style={colStyle}>
      <h3 style={textStyleTop}>{props.body}</h3>
      <p style={textStyleBottom}><a style={linkStyle} href={props.linkto}>{props.linkto}</a></p>
    </Col>
  </div>


export default ResponseHeader
