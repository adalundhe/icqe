import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo'
import {withRouter} from 'react-router-dom'
import {filterSortMap, calcFrequency, cleanWords} from './Utilities'
import {DefaultInterface} from '../../Utilities'
import {QuestionMutation, AddNewQuestionMutation, AddNewTagsMutation} from './Queries'
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
    DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/ask')
    const query = this.state.question
    this.props.QuestionMutation({variables: {query}})
      .then((response) => {
        DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/questionql')
        const data = response.data.submitQuestion
        data.response = filterSortMap(data.response)
        data.similarities = calcFrequency(filterSortMap(data.response, 'similarity'))
        this.setState({data: data, showData: true, status: 'ready', question: ''})
        this.props.AddNewQuestionMutation({variables: {body: query, userid: this.props.user.userId, answerid: data.response[0].answerid}})
          .then(response => {
            DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/tagql')
            const data = response.data.AddNewQuestion.Question
            const tags = cleanWords(data.Body).split(" ").filter(item => item !== "")
            console.log("Data",tags,data)
            this.props.AddNewTagsMutation({variables: {tags: tags, questionid: data.QuestionId, userid: data.UserId}})
              .then(response => {
                this.forceUpdate()
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
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

const AskContainerComponent= compose(
  graphql(QuestionMutation, {name: "QuestionMutation"}),
  graphql(AddNewQuestionMutation, {name: "AddNewQuestionMutation"}),
  graphql(AddNewTagsMutation, {name: "AddNewTagsMutation"})
)(withRouter(AskContainer))

export default AskContainerComponent
