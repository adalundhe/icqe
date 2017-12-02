import gql from 'graphql-tag'

const topUserTagsQuery = gql`
  query topUserTags($userid: ID!, $limit: Int!){
    topUserTags(userId: $userid, limit: $limit){
      tagid
      userid
      questionid
      body
      count
      created
    }
  }
`

const topTagsByTimeQuery = gql`
  query topTagsByTime($userid: ID!, $limit: Int!){
    topTagsByTime(userId: $userid, limit: $limit){
      tagid
      userid
      questionid
      body
      created
    }
  }
`

const tagsByUserTimeQuery = gql`
  query tagsByUserTime($query: String!, $userid: ID!, $limit: Int!){
    tagid
    userid
    questionid
    body
    count
    created
  }
`

const topNewestTagsQuery = gql`
  query topTagsByTime($limit: Int!){
    topTagsByTime(limit: $limit){
      tagid
      userid
      questionid
      body
      count
      created
    }
  }
`
export {topUserTagsQuery, topTagsByTimeQuery, tagsByUserTimeQuery, topNewestTagsQuery}
