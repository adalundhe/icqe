import {topUserTagsQuery, topTagsByTimeQuery, tagsByUserTimeQuery, topNewestTagsQuery, topCommunityTagsQuery} from './Queries'
import {QuestionMutation} from '../Queries'
import {filterSortMap, calcFrequency} from '../Utilities'
import {DefaultInterface} from '../../../Utilities'

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
      context.setState({topUserTags: data, range: range})
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
      context.setState({topTagsByTime: parsed_dates, loaded: true})
      relevantQuestions(context, context.state.topUserTags.map(item => item['body']))
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
      console.log(data)
    })
}

const topNewestTags = (context, limit) => {
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/meta')
  // WARNING: This is an expensive query
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
      context.setState({topNewestTags: parsed_dates, loaded: true})
      relevantQuestions(context, context.state.topNewestTags.map(item => item['body']))
    })
}

const relevantQuestions = (context, querySequence) => {
  const query = querySequence.join(" ")
  context.props.client.mutate({
    mutation: QuestionMutation,
    variables: {query}
  })
  .then(response => {
    const data = response.data.submitQuestion
    const results = filterSortMap(data.response).slice(0,3)
    context.setState({relevantQuestions: results, questionsLoaded: true})
  })

}

const topCommunityTags = (context, limit) => {
  console.log("LIMIT",limit,typeof limit)
  DefaultInterface.setInterface('http://'+process.env.REACT_APP_API+'/user-profile/meta')
  context.props.client.query({
    query: topCommunityTagsQuery,
    variables: {limit}
  })
  .then(response => {
    const data = response.data.topCommunityTags
    const range = response.data.topCommunityTags[0]['count']
    context.setState({topCommunityTags: data, range: range})
  })
  .catch(err => console.log(err))
}


export {topUserTags, topTagsByTime, relevantQuestions, tagsByUserTime, topNewestTags, topCommunityTags}
