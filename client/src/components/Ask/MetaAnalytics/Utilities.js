import {topUserTagsQuery, topTagsByTimeQuery, tagsByUserTimeQuery, topNewestTagsQuery} from './Queries'

const topUserTags = (context, limit) => {
  const userId = context.props.user.userId
  const tempUserId = "2f541769-1b7a-454f-a351-ed36ac672b26"
  context.props.client.query({
    query: topUserTagsQuery,
    variables: {userid: tempUserId, limit: limit}
  })
    .then(response => {
      const data = response.data.topUserTags
      context.setState({topUserTags: data})
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
      context.setState({topTagsByTime: data})
    })
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
      console.log(data)
    })
}

export {topUserTags, topTagsByTime, tagsByUserTime, topNewestTags}
