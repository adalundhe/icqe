import {topUserTagsQuery, topTagsByTimeQuery, tagsByUserTimeQuery, topNewestTagsQuery, topCommunityTagsQuery} from './Queries'
import {QuestionMutation} from '../Queries'
import {filterSortMap, calcFrequency} from '../Utilities'
import {DefaultInterface} from '../../../Utilities'
import {distanceToUserQuery} from './AnalysisTypes/Geolocation/Queries'


const getDistances = (context, userId, userIds) => {
  console.log("LAUNCH!")
  context.props.client.query({
    query: distanceToUserQuery,
    variables: {userid: userId, userids: userIds}
  })
    .then(response => {
      console.log(response)
    })
    .catch(err => console.log(err))
}

const topUserTags = (context, limit) => {
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/meta')
  const userId = context.props.user.userId
  context.props.client.query({
    query: topUserTagsQuery,
    variables: {userid: userId, limit: limit}
  })
    .then(response => {
      const data = response.data.topUserTags
      const range = response.data.topUserTags[0]['count']
      context.setState({topUserTags: data, userRange: range})
    })
    .catch(err => console.log(err))
}

const topTagsByTime = (context, limit) => {
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/meta')
  const userId = context.props.user.userId

  context.props.client.query({
    query: topTagsByTimeQuery,
    variables: {userid: userId, limit: limit}
  })
    .then(response => {
      const data = response.data.topTagsByTime
      const parsed_dates = data.map(item => {
        const newData = {}
        Object.assign(newData, item)
        newData['created'] = new Date(item['created']).toLocaleDateString()
        return newData
      })
      context.setState({topTagsByTime: parsed_dates, analyticsLoaded: true})
    })
    .catch(err => console.log(err))
}

const tagsByUserTime = (context, query, limit) => {
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/meta')
  context.props.client.query({
    query: tagsByUserTimeQuery,
    variables: {query, userid: context.props.user.userId, limit: limit}
  })
    .then(response => {
      const data = response.data.tagsByUserTime
    })
    .catch(err => console.log(err))
}

const topNewestTags = (context, limit) => {
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/meta')
  context.props.client.query({
    query: topNewestTagsQuery,
    variables: {limit}
  })
    .then(response =>{
      const data = response.data.topNewestTags
      const parsed_dates = data.map(item => {
        const newData = {}
        Object.assign(newData, item)
        newData['created'] = new Date(item['created']).toLocaleDateString()
        return newData
      })
      context.setState({topNewestTags: parsed_dates, analyticsLoaded: true})
    })
}

const relevantQuestions = (context, querySequence, type) => {
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/meta')
  const query = querySequence.join(" ")
  context.props.client.mutate({
    mutation: QuestionMutation,
    variables: {query}
  })
  .then(response => {
    const data = response.data.submitQuestion
    const results = filterSortMap(data.response).slice(0,3)

    if(type === 'user'){
        context.setState({relevantUserQuestions: results, questionsLoaded: true})
    }
    else{
      context.setState({relevantCommunityQuestions: results, questionsLoaded: true})
    }

  })

}

const topCommunityTags = (context, limit) => {
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/meta')
  context.props.client.query({
    query: topCommunityTagsQuery,
    variables: {limit}
  })
  .then(response => {
    const data = response.data.topCommunityTags
    const range = response.data.topCommunityTags[0]['count']
    context.setState({topCommunityTags: data, communityRange: range})
    relevantQuestions(context, data.map(item => item['body']), 'community')
  })
  .catch(err => console.log(err))
}


export {topUserTags, topTagsByTime, relevantQuestions, tagsByUserTime, topNewestTags, topCommunityTags, getDistances}
