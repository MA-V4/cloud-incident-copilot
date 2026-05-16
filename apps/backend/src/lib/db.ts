import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

/**
 * DynamoDB document client.
 * In local development, points to DynamoDB Local via DYNAMODB_ENDPOINT env var.
 * In production, omit DYNAMODB_ENDPOINT and use real AWS DynamoDB.
 */
const raw = new DynamoDBClient({
  region: process.env.AWS_REGION || 'eu-west-2',
  endpoint: process.env.DYNAMODB_ENDPOINT, // http://localhost:8000 locally
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
  },
});

export const db = DynamoDBDocumentClient.from(raw);
