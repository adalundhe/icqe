import React, {Component} from 'react'
import NavBar from './NavBar'

class NavBarContainer extends Component{
  state = {
    isActive: [1, 0, 0, 0]
  }
  componentDidMount = () => {
    if(window.location.href.includes('/ask/my-usage')){
      this.setActive(0)
    }
    else if (window.location.href.includes('./community-usage')) {
      this.setActive(1)
    }
  }
  setActive = (index) => {
    console.log("ACTIVE",index)
    const activeNavItems = [0, 0, 0, 0]
    activeNavItems[index] = 1
    this.setState({isActive: activeNavItems})
  }
  render(){
    return(
        <NavBar isActive={this.state.isActive} setActive={this.setActive} />
    )
  }
}

export default NavBarContainer
