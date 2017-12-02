import gql from 'graphql-tag'

const QuestionMutation = gql`
  mutation submitQuestion($query: String!){
    submitQuestion(query: $query){
      response{
        body
        similarity
        linkto
      }
      responseTime
      responseLength
    }
  }
`

// const AddUser = gql`
//   query
// `

export {QuestionMutation}
