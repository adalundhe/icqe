import React from 'react'
import TransitionGroup from 'react-addons-transition-group'
import {TweenMax} from "gsap"

function TransitionComponent(Component){

  class TransitionController extends React.Component{
    state = {
      entering: true,
      exiting: false,
    }
    componentWillEnter(callback) {
      const el = this.container;
      this.setState({entering: true, exiting: false})
      TweenMax.fromTo(el, 0.3, { y: 100, opacity: 0 }, { y: 0, opacity: 1, onComplete: callback });
    }

    componentWillLeave(callback) {
      const el = this.container;
      this.setState({entering: false, exiting: true})
      TweenMax.fromTo(el, 0.3, { y: 0, opacity: 1 }, { y: 100, opacity: 0, onComplete: callback });
    }
    transitionFinished = () => {
      this.setState({entering: false, exiting: false})
    }
    exit = () => {
      this.componentWillLeave(() => {})
    }
    render(){
      return(
        <div ref={c => this.container = c}>
          <Component exit={this.exit} {...this.props} />
        </div>
      )
    }
  }

  return (
    class extends React.Component{
      state = {
        loaded: false
      }
      componentDidMount = () => this.setState({loaded: true})
      render(){
        return(
          <div>
            <TransitionGroup>
              {this.state.loaded && <TransitionController {...this.props} />}
            </TransitionGroup>
          </div>
        )
      }
    }
  )
}



export {TransitionComponent}
