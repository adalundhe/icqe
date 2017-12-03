import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import {withRouter} from 'react-router-dom'
import {filterSortMap, calcFrequency} from './Utilities'
import {DefaultInterface} from '../../Utilities'
import {QuestionMutation} from './Queries'
import Ask from './Ask'
import ResponseList from './ResponseList'
import AnalyticsContainer from './MetaAnalytics/AnalyticsContainer'

class AskContainer extends Component{
  state = {
    question: '',
    data: {},
    showData: false,
    status: 'loading',
    loaded: false,
    showAsk: true
  }
  componentDidMount = () => this.setState({loaded: true})

  onTextChange = (event) => {
    this.setState({question: event.target.value, status: 'loading'})
  }
  submitQuestion = (event) => {
    event.preventDefault()
    DefaultInterface.setInterface('http://localhost:3000/user-profile/ask')
    const query = this.state.question
    this.props.mutate({variables: {query}})
      .then((response) => {
        const data = response.data.submitQuestion
        data.response = filterSortMap(data.response)
        data.similarities = calcFrequency(filterSortMap(data.response, 'similarity'))
        this.setState({data: data, showData: true, status: 'ready', question: ''})
      })
  }
  analyticsSelect = (index) => {
    const data = this.state.data
    data.response[index].showAnalytics = !data.response[index].showAnalytics
    this.setState({data})
  }
  selectAnalytics = () => {
    this.setState({showAsk: !this.state.showAsk})
  }
  render(){
    return(
      <div>
        <AnalyticsContainer user={this.props.user} selectAnalytics={this.selectAnalytics} />
        {
          this.state.showAsk ?
          <div>
            <Ask onTextChange={this.onTextChange} submitQuestion={this.submitQuestion} status={this.props.status}/>
            <div>
            {this.state.showData ? <ResponseList {...this.state.data} analyticsSelect={this.analyticsSelect} />
              :
              null
            }
            </div>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default graphql(QuestionMutation)(withRouter(AskContainer))
