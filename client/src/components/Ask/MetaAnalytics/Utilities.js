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
      console.log("GOT",data)
      context.setState({topNewestTags: data, loaded: true})
    })
}


export {topUserTags, topTagsByTime, tagsByUserTime, topNewestTags}
