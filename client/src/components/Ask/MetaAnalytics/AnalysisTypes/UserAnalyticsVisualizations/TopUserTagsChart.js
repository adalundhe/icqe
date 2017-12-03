import React, {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts'
import {ChartStyles} from '../../../LocalStyles/AnalyticsStyles'

class TopUserTagsChart extends Component{
  state = {
    loaded: false

  }
  componentDidMount = () => this.setState({loaded: true})
  render(){
    return(
      <div>
      <p style={{fontFamily: 'sans-serif', fontSize: '1.2em', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', textTransform: 'lowercase', marginLeft: '3.25em'}}>my top tags</p>
      {
        this.state.loaded ?
        <BarChart width={1000} height={250} data={this.props.topUserTags} margin={{bottom: 50}} style={{letterSpacing: '0.1em', textTransform: 'lowercase', fontFamily: 'sans-serif', fontSize: '0.6em', color: 'rgba(0,0,0,0.5)'}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="body">
            <Label value="Tag Name" offset={0} position="bottom" style={{fontSize: '1em', letterSpacing: '0.1em', textTransform: 'lowercase', color: 'rgba(0,0,0,0.3)', fontFamily: 'sans-serif'}} />
          </XAxis>
          <YAxis>
            <Label value="Frequency" angle={-90} offset={-25} position="left" style={{fontSize: '1em', letterSpacing: '0.1em', textTransform: 'lowercase', color: 'rgba(0,0,0,0.3)', fontFamily: 'sans-serif'}} />
          </YAxis>
          <Tooltip />
          <Bar dataKey="count" fill="#59ABE3" barSize={50} />
        </BarChart>
        :
        null
      }
      </div>
    )
  }
}

export default TopUserTagsChart
