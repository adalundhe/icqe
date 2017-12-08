import React, {Component} from 'react'
import {RadarChart, Radar, PolarAngleAxis, PolarRadiusAxis, PolarGrid, Tooltip, Legend, Label} from 'recharts'
import {ChartStyles} from '../../../LocalStyles/AnalyticsStyles'

class TopCommunityTagsChart extends Component{
  state = {
    loaded: false

  }
  componentDidMount = () => {
    this.setState({loaded: true})
    console.log("PROPS",this.props)
  }
  render(){
    return(
      <div style={{marginLeft: '3em', marginTop: '2em'}}>
      <p style={{fontFamily: 'sans-serif', fontSize: '1.2em', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', textTransform: 'lowercase', marginBottom: '0', marginLeft: '1em'}}>my top tags</p>
      {
        this.state.loaded ?
        <RadarChart width={400} height={300} data={this.props.topCommunityTags} margin={{bottom: 50, top: 25, left: 25, right: 0}} style={{margin: '0', letterSpacing: '0.1em', textTransform: 'lowercase', fontFamily: 'sans-serif', fontSize: '0.7em', color: 'rgba(0,0,0,0.5)'}}>
          <PolarGrid />
          <Legend verticalAlign="top" align="left"/>
          <PolarAngleAxis dataKey="body" />
          <PolarRadiusAxis angle={30} domain={[0, this.props.range]}/>
          <Tooltip />
          <Radar dataKey="count" stroke="#3498DB" fill="#336E7B" fillOpacity={0.6} />
        </RadarChart>
        :
        null
      }
      </div>
    )
  }
}

export default TopCommunityTagsChart
