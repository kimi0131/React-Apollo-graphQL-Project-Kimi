import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
    query {
        people {
            id
            firstName
            lastName
        }
    }    
`

export const ADD_Car = gql`
    mutation AddCar($AddCar: AddCarInput!) {
        addCar(Car: $AddCar) {
        id
        firstName
        lastName
        }
    }
`

export const REMOVE_Car = gql`
    mutation RemoveCar($id: ID!){
        removeCar(id: $id){
            id
            firstName
            lastName
        }
    }
`

export const UPDATE_Car = gql`
    mutation UpdateCar($id: ID!, $UpdateCar: UpdateCarInput!) {
        updateCar(id: $id, update: $UpdateCar) {
            id
            firstName
            lastName
        }
    }
`
export const GET_CARS = gql`
    query {
        people {
            id
            year
            make
            model
            price
            personId
        }
    }    
`

export const ADD_CAR = gql`
    mutation AddCar($AddCar: AddCarInput!) {
        addCar(car: $AddCar) {
            id
            year
            make
            model
            price
            personId
        }
    }
`

export const REMOVE_CAR = gql`
    mutation RemoveCar($id: ID!){
        removeCar(id: $id){
            id
            year
            make
            model
            price
            personId
        }
    }
`

export const UPDATE_CAR = gql`
    mutation UpdateCar($id: ID!, $UpdateCar: UpdateCarInput!) {
        updateCar(id: $id, update: $UpdateCar) {
            id
            year
            make
            model
            price
            personId
        }
    }
`