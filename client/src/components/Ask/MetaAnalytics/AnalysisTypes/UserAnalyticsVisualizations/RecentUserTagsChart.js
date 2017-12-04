import React, {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, LabelList} from 'recharts'

let data = []
let ticks = []

class RecentUserTagsChart extends Component{
  state = {
    loaded: false
  }
  componentDidMount = () => {
    data = this.props.topTagsByTime
    ticks = data.map((item,i) => i+1)
    console.log(ticks)
    const coallated = data.map(item => data.filter(inner_item => inner_item['body'] === item['body']))

    data = Array.from(new Set(coallated.sort()
                .map(JSON.stringify)), JSON.parse)
                .sort(item => item['created'] > item['created'] )

    console.log(data)
    this.setState({loaded: true})
  }
  render(){
    return(
      <div>
      <p style={{fontFamily: 'sans-serif', fontSize: '1.2em', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', textTransform: 'lowercase', marginLeft: '3.25em', marginBottom: '0'}}>tag usage by time</p>
      {
        this.state.loaded ?
        <div>
        <BarChart width={1000} height={250} data={this.props.topTagsByTime}
            margin={{top: 25, right: 0, left: 0, bottom: 50}}
            style={{letterSpacing: '0.1em', textTransform: 'lowercase', fontFamily: 'sans-serif', fontSize: '0.7em', color: 'rgba(0,0,0,0.5)'}}
            >
           <XAxis dataKey="created"/>
           <YAxis dataKey="count"/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="count" fill="#59ABE3" fillOpacity={0.6}>
            <LabelList dataKey="body" position="top" />
           </Bar>
          </BarChart>
        </div>
        :
        null
      }
      </div>
    )
  }
}

export default RecentUserTagsChart
