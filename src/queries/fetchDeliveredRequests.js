import gql from 'graphql-tag'

export default gql`
    query MyDeliveredRequests( $skip: Int, $first: Int, $orderBy: RequestOrderByInput) {
        myDeliveredRequests(skip: $skip, first: $first, orderBy: $orderBy) {
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