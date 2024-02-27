import { gql } from '@apollo/client'

export const GET_PEOPLE_WITH_CARS = gql`
    query {
        people {
            id
            firstName
            lastName
            cars {
                id
                year
                make
                model
                price
                personId
            }
        }
    }
`

export const GET_PERSON_WITH_CARS = gql`
    query person($id: ID!) {
        person(id: $id) {
            id
            firstName
            lastName
            cars {
                id
                year
                make
                model
                price
                personId
            }
        }
    }
`

export const ADD_PERSON = gql`
    mutation AddPerson($AddPerson: AddPersonInput!) {
        addPerson(person: $AddPerson) {
        id
        firstName
        lastName
        cars {
            id
            year
            make
            model
            price
            personId
            }        
        }
    }
`

export const REMOVE_PERSON = gql`
    mutation RemovePerson($id: ID!){
        removePerson(id: $id){
            id
            firstName
            lastName
        }
    }
`

export const UPDATE_PERSON = gql`
    mutation UpdatePerson($id: ID!, $UpdatePerson: UpdatePersonInput!) {
        updatePerson(id: $id, update: $UpdatePerson) {
            id
            firstName
            lastName
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
