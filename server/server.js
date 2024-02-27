import { ApolloServer } from "@apollo/server"
// this plugin is used to stop the http server correctly. 
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { expressMiddleware } from "@apollo/server/express4"
// importing "express" means I do not have to declaire "const express = require()" anymore.
import express from "express"
// import http module to reate http server
import http from "http"
import cors from "cors"
import bodyParser from "body-parser"
import { typeDefs, resolvers } from './src/schema.js'

// to start the Apollo server, need to pass typeDefs(definition of the GraphQL schema type) and resolvers (query resolver function)
const startApolloServer = async (typeDefs, resolvers) => {
    // create express application object which is based for the http server.
    const app = express()

    // create http server using express app, which enables to deal with http request.
    const httpServer = http.createServer(app)

    // create appolo server instance, which enables to config GraphQL server and process the request. TypeDefs, resolbers and a plugin are passed to the constructor.
    const server = new ApolloServer(
        { 
            // the definition of the GraphQL schema type.
            typeDefs,
            // An object containing the query resolution function.
            resolvers,
            // inside the plugin, we can identify the sever which I would like to stop at the same time. This time, we would like to stop httpServer and Apollo server, which means appliation itself will be stopped.
            plugins: [ApolloServerPluginDrainHttpServer({httpServer})] 
        }
    )

    // wait until sever start. Once start, GraphQL is ready for receiving the request.
    await server.start()


    // Specify the path(GrapthQL endpoint) where we'd like to mount Apollo server    
    app.use(
        // 1st arg: specify the path to deal with the request using the middleware which is app.use()
        '/graphql', 
        // 2nd arg: set the COR middleware (cors()) to allow access from the different origin from frontend. 
        cors(), 
        // return to JSON when get the reply from GraphQL API.
        bodyParser.json(), 
        // 4th arg: custome middleware funcation. 
        // 1st arg: Decide which sever mounting to the express application. (Apollo server)
        expressMiddleware(server, {
            // 2nd arg: get the token from the client request and set it as the context. this token will be used resolver func and middleware to authenticate.
            context: async({ req }) => ({ token: req.headers.token })
        })
    )

    // ready for receive requests from the client. (servers setting up is over above,)
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))

    // console.log(`server ready at http://localhost:4000/graphql`)
}

startApolloServer(typeDefs, resolvers)