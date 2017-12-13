import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo'
import {withRouter} from 'react-router-dom'
import {filterSortMap, calcFrequency, cleanWords, askQuestion} from './Utilities'
import {DefaultInterface} from '../../Utilities'
import {QuestionMutation, AddNewQuestionMutation, AddNewTagsMutation} from './Queries'
import {topUserTags, topTagsByTime, tagsByUserTime, topNewestTags, topCommunityTags} from './MetaAnalytics/Utilities'
import Ask from './Ask'
import {withApollo } from 'react-apollo'
import ResponseList from './ResponseList'
import AnalyticsContainer from './MetaAnalytics/AnalyticsContainer'

class AskContainer extends Component{
  state = {
    question: '',
    data: {},
    showData: false,
    status: 'loading',
    loaded: false,
    showAsk: true,
    topUserTags: [],
    topTagsByTime: [],
    relevantUserQuestions: [],
    relevantCommunityQuestions: [],
    topNewestTags: [],
    topCommunityTags: [],
    analyticsLoaded: false,
    questionsLoaded: false,
    userRange: 0,
    communityRange: 0,
    showAnalytics: false
  }
  componentDidMount = () => {
    this.setState({loaded: true})
  }

  onTextChange = (event) => {
    this.setState({question: event.target.value, status: 'loading'})
  }
  loadData = () => {
    this.setState({analyticsLoaded: false, questionsLoaded: false})
    topUserTags(this,10)
    topTagsByTime(this, 10)
    topCommunityTags(this, 10)
    topNewestTags(this, 10)
  }
  submitQuestion = (event) => {
    event.preventDefault()
    DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/ask')
    askQuestion(this, this.state.question)
  }
  analyticsSelect = (index) => {
    const data = this.state.data
    data.response[index].showAnalytics = !data.response[index].showAnalytics
    this.setState({data})
  }
  selectAnalytics = () => {
    this.loadData()
    this.props.setVisibility(false)
  }
  render(){
    const data = {
      topUserTags: this.state.topUserTags,
      topCommunityTags: this.state.topCommunityTags,
      topNewestTags: this.state.topNewestTags,
      topTagsByTime: this.state.topTagsByTime,
      relevantUserQuestions: this.state.relevantUserQuestions,
      relevantCommunityQuestions: this.state.relevantCommunityQuestions,
      analyticsLoaded: this.state.analyticsLoaded,
      questionsLoaded: this.state.questionsLoaded,
      userRange: this.state.userRange,
      communityRange: this.state.communityRange
    }
    return(
      <div>
        <AnalyticsContainer user={this.props.user} selectAnalytics={this.selectAnalytics}
        loadData={this.loadData} showAnalytics={this.props.showAnalytics} selectAnalytics={this.selectAnalytics} data={data} />
        {
          this.props.showAsk ?
          <div>
            <Ask onTextChange={this.onTextChange} submitQuestion={this.submitQuestion} status={this.props.status}/>
            <div>
            {this.props.showData ? <ResponseList {...this.state.data} analyticsSelect={this.analyticsSelect} />
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

const AskContainerComponent= compose(
  withApollo,
  graphql(QuestionMutation, {name: "QuestionMutation"}),
  graphql(AddNewQuestionMutation, {name: "AddNewQuestionMutation"}),
  graphql(AddNewTagsMutation, {name: "AddNewTagsMutation"})
)(withRouter(AskContainer))

export default AskContainerComponent
