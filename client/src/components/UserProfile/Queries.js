import gql from 'graphql-tag';

const mutateUser = gql`
  mutation AddNewUser($firstName: String!, $lastName: String!){
    AddNewUser{
      User(FirstName: $firstName, LastName: $lastName){
        UserId
        FirstName
        LastName
      }
    }
  }
`

const mutateAddress = gql`
  mutation AddNewAddress($userid: ID!, $city: String!, $state: String!, $zip: String!){
    AddNewAddress{
      Address(UserId: $userid, City: $city, State: $state, Zip: $zip){
        AddressId
        City
        State
        Zip
      }
    }
  }
`

const mutateExistingUser = gql`
  mutation UpdateUserById($userid: ID!, $firstName: String!, $lastName: String!){
    UpdateUserById{
      User(UserId: $userid, FirstName: $firstName, LastName: $lastName){
        UserId
        FirstName
        LastName
      }
    }
  }
`

const mutateExistingAddress = gql`
  mutation UpdateAddressById($addressid: ID!, $userid: ID!, $city: String!, $state: String!, $zip: String!){
    UpdateAddressById{
      Address(AddressId: $addressid, UserId: $userid, City: $city, State: $state, Zip: $zip){
        AddressId
        UserId
        City
        State
        Zip
      }
    }
  }
`

export {mutateUser, mutateAddress, mutateExistingUser, mutateExistingAddress}
