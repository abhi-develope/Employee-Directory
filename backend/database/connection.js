import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee-directory';
let client;
let db;

export async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('employee-directory');
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectDB first.');
  }
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
  }
}