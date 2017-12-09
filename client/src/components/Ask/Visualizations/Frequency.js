import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend} from 'recharts'
import {relevancyRank} from '../Utilities'
import ActiveSectorMark from './ActiveSector'
import {selectColorByEQ} from './ColorMaps'

let COLORS = []

let data = [{name: 'Relevance: > 80%', value: 0}, {name: 'Relevance: > 70%', value: 0},
              {name: 'Relevance: > 60%', value: 0}, {name: 'Relevance: > 50%', value: 0},
              {name: 'Relevance: > 40%', value: 0}, {name: 'Relevance: > 30%', value: 0},
              {name: 'Relevance: > 20%', value: 0}, {name: 'Relevance: > 0%', value: 0}]


class Frequency extends Component{
  state = {
    loaded: false,
    activeIndex: 0,
    data: [],
  }
  componentDidMount = () => {

    const simKeys = Object.keys(this.props.similarities)
    const similarityIndex = simKeys.indexOf(relevancyRank(this.props.responseSimilarity))

    data = data.map((item, index) => {
      const stringIndex = String(index+1)
      item.value = this.props.similarities[stringIndex] || 0
      return item
    })

    const newData = data.filter((item, index) => item.value > 0)
    COLORS = simKeys.map(key => selectColorByEQ(key))

    this.setState({loaded: true, activeIndex: similarityIndex, data: newData})
  }
  render(){
    return(
      <div>
      {
        this.state.loaded ?
        <div>
          <h3 style={{color: 'rgba(0,0,0,0.7)', textTransform: 'lowercase', letterSpacing: '0.1em', fontFamily: 'sans-serif', marginTop: '4em', fontSize: '0.8em'}}>Response Relevance Makeup</h3>
          <p style={{color: 'rgba(0,0,0,0.5)', textTransform: 'lowercase', letterSpacing: '0.1em', fontFamily: 'sans-serif', fontSize: '0.7em', width: '50%', marginBottom: '1em'}}>
            Below indicates the percentage of all responses returned in a given similarity range. The
            active sector indicates where in the distribution  <em>this</em> response lies.
          </p>
          <PieChart width={578} height={200} onMouseEnter={this.onPieEnter}
          style={{marginTop: '2em', color: 'rgba(0,0,0,0.7)', borderColor: '#ADC6F1', fontSize: '0.75em', textTransform: 'lowercase', letterSpacing: '0.1em', fontFamily: 'sans-serif'}}>
            <Legend verticalAlign="top" height={300} width={200} layout='vertical' align='right'/>
            <Pie
              style={{fontFamily: 'sans-serif',
              textTransform: 'lowercase', letterSpacing: '0.1em',
              fontSize: '1.4em', fontWeight: '700'}}
              data={this.state.data}
              fill="#34495E"
              cx={125}
              cy={100}
              innerRadius={60}
              outerRadius={70}
              paddingAngle={3}
              activeIndex={this.state.activeIndex}
              activeShape={ActiveSectorMark}
              label
            >
              {
                this.state.data.map((entry, index) => {
                  return <Cell key={index} fill={COLORS[index]}/>
                })
              }
            </Pie>
          </PieChart>
        </div> :
        null
      }
      </div>
    )
  }
}

export default Frequency
