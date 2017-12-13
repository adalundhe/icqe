import React, {Component} from 'react'
import NavBar from './NavBar'

class NavBarContainer extends Component{
  state = {
    isActive: [1, 0, 0, 0, 0]
  }
  componentDidMount = () => {
    if(window.location.href.indexOf('/ask') > -1){
      this.setActive(2)
      this.props.setVisibility(true)
    }
    else if (window.location.href.indexOf('/user-profile') > -1) {
      this.setActive(3)
    }
    else if (window.location.href.indexOf('/logout') > -1) {
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

    if(window.location.href.indexOf('/ask') > -1){
      this.props.setVisibility(true)
    }

  }
  render(){
    return(
        <NavBar isActive={this.state.isActive} setActive={this.setActive} />
    )
  }
}

export default NavBarContainer
