import {topUserTagsQuery, topTagsByTimeQuery, tagsByUserTimeQuery, topNewestTagsQuery, topCommunityTagsQuery} from './Queries'
import {QuestionMutation} from '../Queries'
import {filterSortMap, calcFrequency} from '../Utilities'

const topUserTags = (context, limit) => {
  const userId = context.props.user.userId
  const tempUserId = "2f541769-1b7a-454f-a351-ed36ac672b26"
  context.props.client.query({
    query: topUserTagsQuery,
    variables: {userid: tempUserId, limit: limit}
  })
    .then(response => {
      const data = response.data.topUserTags
      const range = response.data.topUserTags[0]['count']
      context.setState({topUserTags: data, range: range})
    })
    .catch(err => console.log(err))
}

const topTagsByTime = (context, limit) => {
  const userId = context.props.user.userId
  const tempUserId = "2f541769-1b7a-454f-a351-ed36ac672b26"

  context.props.client.query({
    query: topTagsByTimeQuery,
    variables: {userid: tempUserId, limit}
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
  context.props.client.query({
    query: tagsByUserTimeQuery,
    variables: {query, userid: context.props.user.userId, limit}
  })
    .then(response => {
      const data = response.data.tagsByUserTime
      console.log(data)
    })
}

const topNewestTags = (context, limit) => {
  // WARNING: This is an expensive query
  context.props.client.query({
    query: topNewestTagsQuery,
    variables: {limit}
  })
    .then(response =>{
      const data = response.data.topNewestTags
      context.setState({topNewestTags: data, loaded: true})
    })
}

const relevantQuestions = (context, querySequence) => {

  const query = querySequence.join(" ")
  console.log(querySequence)
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
  context.props.client.query({
    query: topCommunityTagsQuery,
    variables: {limit}
  })
  .then(response => {
    const data = response.data.topCommunityTags
    const results = filterSortMap(data.response)
    context.setState({topCommunityTags: results})
  })
}


export {topUserTags, topTagsByTime, relevantQuestions, tagsByUserTime, topNewestTags, topCommunityTags}
