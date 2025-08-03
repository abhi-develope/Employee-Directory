import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';
import { connectDB } from './database/connection.js';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Start the server
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req }) => {
        return { req };
      },
    });

    console.log(` Server ready at: ${url}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();