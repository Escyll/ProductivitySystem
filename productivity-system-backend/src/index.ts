import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  enum Status {
    Todo,
    PartiallyDone,
    Done
  }

  type Task {
    description: String!
    status: String!
    dayCards: [DayCard]
  }

  type DayCard {
    day: String!
    tasks: [Task]!
  }

  type Query {
    tasks: [Task]
    dayCards: [DayCard]
  }
`;
let dayCards;
const tasks = [
  {
    description: "Shower",
    status: "Todo",
    dayCards: dayCards,
  },
  {
    description: "Eat",
    status: "Todo",
    dayCards: dayCards,
  },
];

dayCards = [
  {
    day: "Today",
    tasks: tasks,
  },
];

tasks[0].dayCards = dayCards;
tasks[1].dayCards = dayCards;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    tasks: () => tasks,
    dayCards: () => dayCards,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
