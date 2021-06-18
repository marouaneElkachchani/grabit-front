import gql from 'graphql-tag'

export default gql`
    query {
        onHoldRequests {
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
                    owner {
                        name
                    }
                    driver {
                        name
                    }
                    originPlaceId
                    destinationPlaceId
        }
    }
`