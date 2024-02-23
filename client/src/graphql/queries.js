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

export const ADD_PERSON = gql`
    mutation AddPerson($AddPerson: AddPersonInput!) {
        addPerson(person: $AddPerson) {
        id
        firstName
        lastName
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