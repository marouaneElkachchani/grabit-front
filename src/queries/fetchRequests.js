import gql from 'graphql-tag'

export default gql`
    query {
        myRequests {
                    id
                    description
                    items {
                            name
                    }
                    status
                    date
                    schedule
                    costRange {
                                from
                                to
                    }
                    addressDeparture
                    deliveryAddress
        }
    }
`