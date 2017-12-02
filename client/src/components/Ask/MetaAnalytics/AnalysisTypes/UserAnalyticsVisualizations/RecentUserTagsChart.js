import React, {Component} from 'react'
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class RecentUserTagsChart extends Component{
  state = {
    loaded: false
  }
  componentDidMount = () => this.setState({loaded: true})
  render(){
    return(
      <div>
        <p style={{fontFamily: 'sans-serif', fontSize: '1.2em', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', textTransform: 'lowercase', marginLeft: '3.25em'}}>my recent tags</p>
        {
          this.state.loaded ?
          <ScatterChart width={1000} height={300} data={this.props.topTagsByTime}
            margin={{top: 20, right: 30, left: 20, bottom: 10}}>
           <XAxis dataKey="created" height={60}/>
           <YAxis dataKey="body"/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Scatter dataKey="created" fill='#8884d8'/>
         </ScatterChart>
         :
         null
        }
      </div>
    )
  }
}

export default RecentUserTagsChart
