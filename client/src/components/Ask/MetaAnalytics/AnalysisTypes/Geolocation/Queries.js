import gql from 'graphql-tag'

const distanceToUserQuery = gql`
  query distToUser($userid: ID!, $userids: [ID!]){
    distToUser(userId: $userid, userIds: $userids){
      userId
      addressid
      distance
      city
      state
      zip
    }
  }
`

export {distanceToUserQuery}
