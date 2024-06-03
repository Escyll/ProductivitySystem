import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import knex from 'knex'
import { GraphQLScalarType } from 'graphql';

import { TTSDataSource } from "./TTSDataSource.js";
import knexConfig from './knexfile.js'

const myknex = knex(knexConfig.development);

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value: string) {
    return new Date(value);
  },
  serialize(value: Date) {
    return value.toISOString();
  },
})

const typeDefs = `#graphql
  scalar Date

  enum Status {
    Todo,
    PartiallyDone,
    Done
  }

  type Task {
    id: Int!
    description: String!
    status: String!
    dayCard: DayCard
  }

  type DayCard {
    id: Int!
    day: Date!
    tasks: [Task]!
  }

  type Query {
    tasks: [Task]!
    dayCards: [DayCard]!
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Date: dateScalar,
  Query: {
    tasks: async (_, __, { dataSources }) => await dataSources.ttsDataSource.getTasks(),
    dayCards: async (_, __, { dataSources }) => await dataSources.ttsDataSource.getDays(),
  },
  DayCard: {
    day: async (parent) => parent.date,
    tasks: async (parent, _, { dataSources }) => await dataSources.ttsDataSource.getDayCardTasks(parent.id),
  },
  Task: {
    dayCard: async(parent, _, { dataSources }) => await dataSources.ttsDataSource.getTaskDayCard(parent.id),
  }
};

interface ContextValue {
  dataSources: {
    ttsDataSource: TTSDataSource;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({req}) => {
        return {
            dataSources: {
                ttsDataSource: new TTSDataSource(myknex)
            }
        }
    }
});

console.log(`🚀  Server ready at: ${url}`);
