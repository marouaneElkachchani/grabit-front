import gql from 'graphql-tag'

export default gql`
    query {
        me {
            id
            name
            email
            pictureUrl
            phone
            address
            role
        }
    }
`