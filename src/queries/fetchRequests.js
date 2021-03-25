import gql from 'graphql-tag'

export default gql`
    query {
        myRequests {
                    id
                    description
                    items {
                            id
                            name
                    }
                    status
                    date
                    schedule
                    costRange {
                                id
                                from
                                to
                    }
                    addressDeparture
                    deliveryAddress
        }
    }
`