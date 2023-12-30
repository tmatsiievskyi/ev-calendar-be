import 'reflect-metadata';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { resolvers, authChecker } from '../src/global/lib/apollo';

import { dbCreateConnection } from './global/db/createConnection';
import { ExpressServer } from './global/lib/ExpressServer';
import { formatResp } from './global/lib/gql';

dotenv.config();

class App extends ExpressServer {
  constructor() {
    super();
    this.init().catch((error) => {
      this.logger.error(error);
      process.exit(1);
    });
  }

  async init() {
    await this.setUpDb();
    await this.setUpExpress();
    await this.setUpApollo();
    this.start();
  }

  async setUpDb() {
    const connectionStatus = await dbCreateConnection();
    if (connectionStatus instanceof Connection) {
      this.logger.info(
        `DB ready. Name:${connectionStatus.name}. Database:${connectionStatus.options.database}`
      );
    } else {
      this.logger.error(`${connectionStatus}`);
    }
  }

  async setUpExpress() {
    this.app.use(cookieParser());
    this.logger.info('Express ready');
  }

  async setUpApollo() {
    const schema = await buildSchema({
      container: Container,
      resolvers,
      validate: true,
      authChecker,
    });

    const apolloServer = new ApolloServer({
      schema,
      formatResponse: formatResp,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              includeCookies: true,
            })
          : ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
      introspection: true,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app: this.app,
      cors: { origin: 'http://localhost:3001', credentials: true },
    });
    this.logger.info('Apollo ready');
  }
}

new App();
