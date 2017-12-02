import gql from 'graphql-tag'

const userFromIdMutation = gql`
  mutation UserFromId($tokenId: String!){
    UserFromId{
      User(TokenId: $tokenId){
        UserId
        FirstName
        LastName
      }
    }
  }
`

const getUserInfoQuery = gql`
  query GetUserInfo($tokenId: ID!){
    GetUserInfo{
      User(UserId: $tokenId){
        UserId
        FirstName
        LastName
      }
    }
  }
`

const getUserAddressQuery = gql`
  query GetUserAddress($userId: ID!){
    GetUserAddress{
      Address(UserId: $userId){
        AddressId
        City
        State
        Zip
      }
    }
  }
`

export {userFromIdMutation, getUserInfoQuery, getUserAddressQuery}
