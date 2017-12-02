import React, {Component} from 'react'

class TopUserTagsChart extends Component{
  state = {
    loaded: false
  }
  componentDidMount = () => {
    this.setState({loaded: true})
  }
  render(){
    return(
      <div>
      {
        this.state.loaded ?
        <BarChart width={730} height={250} data={this.props.}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
        </BarChart>
        :
        null
      }
      </div>
    )
  }
}

export default TopUserTagsChart
