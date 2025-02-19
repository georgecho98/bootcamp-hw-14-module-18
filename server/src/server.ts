import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
import {typeDefs, resolvers} from './Schemas/index.js'
import {AppolloServer} from "@apollo/server"
import {records} from "./routes/index.js"
import {expressMiddleware} from '@apollo/server/express4'
import { authenticateToken } from './services/auth.js';
const app = express();
const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });


const server = ApolloServer(
{ typeDefs, resolvers})


const startApolloServer = async () =>{
  await server.start();
  await db();
  const app = express();
  const PORT = process.env.PORT || 3001;
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware( server as any,
    {context: authenticateToken as any}  )

  if (process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(_dirname, '../client/dist')))
    app.get('*', (_req: Request, res:Response) =>{
      res.sendFile(path.join(_dirname, '../client/dist/index.html'));

    })
  
  app.listen(PORT, ()=>{
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`USE GraphQL at http://localhost:${PORT}/graphql`)

  })
  
  
  }

}

startApolloServer();

