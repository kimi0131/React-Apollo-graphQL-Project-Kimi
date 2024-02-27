import{ people, cars } from '../peopleCarsScheme'
import find from 'lodash.find';
import remove from 'lodash.remove';

  // define object types called Person and Car in the schema.
  // define the special type which is called Query type. The Query type represents a query operation that a client can perform
  // inside of the Query type, 2 fields are defined, which are called people and cars.
  // people field returns the [Person] type list and cars field returns the [Car] type list.
const typeDefs = `#graphql
  type Person {
      id: ID!
      firstName: String!
      lastName: String!
      cars: [Car!]
  }

  type Car {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
  }

  type Query {
      people: [Person]
      cars: [Car]
      person(id: ID!): Person
      car(id: ID!): Car
  }

  type Mutation {
    addPerson(person: AddPersonInput!): Person
    addCar(car: AddCarInput!): Car

    updatePerson(id: ID!, update: UpdatePersonInput!): Person
    updateCar(id: ID!, update: UpdateCarInput!): Car

    removePerson(id: ID!): Person
    removeCar(id: ID!): Car
  }

  input AddPersonInput {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [AddCarInput]
  }

  input AddCarInput {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
  }

  input UpdatePersonInput {
    firstName: String!
    lastName: String!
  }

  input UpdateCarInput {
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
  }
`

// A resolver functions for Query type field is defined in an object called resolvers.
// Resolvers are used to provide actual data for each field when the query is excuted from the client. Resolver funcs are defined for each field and are called every time a Query is excuted.  
const resolvers = {
  Query: {
    // resolver function for the people field in the Query type is defined by the arrow function called () => peopleArray. Resolver function retrieve data from the variable called peopleArray and returns that data each time the query is excuted.
      people: () => people,
      person(root, args) {
        return find( people, { id: args.id })
      },
      cars: () => cars,
      car(root, args) {
        return find( cars, { id: args.id })
      }
  },
  // Define the Person type and cars filed resolver, which is excuted when cars field are queried. and return every car objects which that person object has. 
  Person: {
    cars(root) {
      return cars.filter((car) => car.personId === root.id )
    }
  },

  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.person.id,
        firstName: args.person.firstName,
        lastName: args.person.lastName,
        cars: []
      }
      people.push(newPerson)

      return newPerson
    },

    updatePerson: (root, args) => {
      const person = find(people, { id: args.id })
      if(!person) {
        throw new Error(`Couldn\'t find person with id ${args.id}`) 
      }
      person.firstName = args.update.firstName
      person.lastName = args.update.lastName

      return person
    },

    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id })
      if(!removedPerson) {
        throw new Error(`Couldn\'t find a person with id ${args.id}`) 
      }

      // delete removedPerson's cars. 
      const personCars = cars.filter(car => car.personId === removedPerson.id) 
      personCars.forEach(personCar => {
        const index = cars.findIndex(c => c.id === personCar.id)
        cars.splice(index, 1)
      })

      remove(people, p => {
        return p.id === removedPerson.id
      })

      return removedPerson
    },

    addCar: (root,args) => {
      const newCar = {
        id: args.car.id,
        year: args.car.year,
        make: args.car.make,
        model: args.car.model,
        price: args.car.price,
        personId: args.car.personId    
      }

      cars.push(newCar)

      return newCar
    },

    updateCar: (root, args) => {
      const car = find(cars, { id: args.id })
      if(!car) {
        throw new Error(`Couldn\'t find car with id ${id}`)
      }

      car.year = args.update.year
      car.make = args.update.make
      car.model = args.update.model
      car.price = args.update.price
      car.personId = args.update.personId

      return car
    },
    
    removeCar: (root, args) => {
      const removedCar = find(cars, { id: args.id })
      if(!removedCar) {
        throw new Error(`Couldn\'t find car with id ${args.id}`) 
      }

      remove(cars, c => {
        return c.id === removedCar.id
      })

      return removedCar
    }
  }
}

  export { typeDefs, resolvers }