import React, {Component} from 'react'

class Legend extends Component {
  state = {
  opacity: {
    	uv: 1,
      pv: 1,
    }
  }
  handleMouseEnter(o) {
    const { dataKey } = o;
    const { opacity } = this.state;

  	this.setState({
    	opacity: { ...opacity, [dataKey]: 0.5 },
    })
  }

  handleMouseLeave(o) {
  	const { dataKey } = o;
    const { opacity } = this.state;

  	this.setState({
    	opacity: { ...opacity, [dataKey]: 1 },
    })
  }
  render () {
    const { opacity } = this.state
    return(

    )
  }
}

export default Legend
