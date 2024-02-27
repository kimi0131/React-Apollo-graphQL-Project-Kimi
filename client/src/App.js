import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './route/Home';
import ShowDetail from './route/ShowDetail';
import './App.css';

// set the appolo client
const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache()
})

// set the route
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/person/:personId",
    element: <ShowDetail />,
  },
]);

// set the app
const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;