import React, {Component} from 'react'
import NavBar from './NavBar'

class NavBarContainer extends Component{
  state = {
    isActive: [1, 0, 0, 0, 0]
  }
  componentDidMount = () => {
    if(window.location.href.includes('/ask')){
      this.setActive(2)
    }
    else if (window.location.href.includes('/user-profile')) {
      this.setActive(3)
    }
    else if (window.location.href.includes('/logout')) {
      this.setActive(4)
    }
    else{
      this.setActive(0)
    }
  }
  setActive = (index) => {
    const activeNavItems = [0, 0, 0, 0, 0]
    const flipActive = (activeNavItems[index]) ? 0 : 1
    const nextActive = [...activeNavItems.slice(0, index), flipActive, ...activeNavItems.slice(index+1)]
    this.setState({isActive: nextActive})

  }
  render(){
    return(
        <NavBar isActive={this.state.isActive} setActive={this.setActive} />
    )
  }
}

export default NavBarContainer
