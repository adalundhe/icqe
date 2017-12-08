import React, {Component} from 'react'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import {selectColorByGT} from './ColorMaps'

class Relevance extends Component {
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart = () => {
      const node = this.node
      const xScale = scaleLinear()
         .domain([0, 1])
         .range([0, this.props.size])
   select(node)
      .selectAll('rect')
      .data([this.props.data])
      .enter()
      .append('rect')

   select(node)
      .selectAll('rect')
      .data([this.props.data])
      .exit()
      .remove()

   select(node)
      .selectAll('rect')
      .data([this.props.data])
      .style('fill', selectColorByGT(this.props.data))
      .attr('x', (d,i) => this.props.size - xScale(d))
      .attr('y', (d, i) => i * 25)
      .attr('height', 25)
      .attr('width', d => xScale(d))
   }
render() {

      const styleSvg = {
        borderLeft: 'solid',
        borderBottom: 'solid',
        borderColor: selectColorByGT(this.props.data),
        borderWidth: 'thin',
        borderRadius: '0.1em'
      }

      return <svg style={styleSvg} ref={node => this.node = node}
      width={this.props.width} height={this.props.height}>
      </svg>
   }
}

export default Relevance
