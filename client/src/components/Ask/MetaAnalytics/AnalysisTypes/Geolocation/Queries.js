import gql from 'graphql-tag'

const distanceToUserQuery = gql`
  query distToUser($userid: ID!, $userids: [ID!]){
    distToUser(userId: $userid, userIds: $userids){
      userId
      distanceFromUser
    }
  }
`

export {distanceToUserQuery}
