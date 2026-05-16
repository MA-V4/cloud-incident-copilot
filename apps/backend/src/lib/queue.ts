import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

/**
 * SQS client.
 * In local development, points to ElasticMQ via SQS_ENDPOINT env var.
 * In production, omit SQS_ENDPOINT and use real AWS SQS.
 */
const client = new SQSClient({
  region: process.env.AWS_REGION || 'eu-west-2',
  endpoint: process.env.SQS_ENDPOINT, // http://localhost:9324 locally
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
  },
});

export async function publishToQueue(queueUrl: string, payload: unknown): Promise<void> {
  await client.send(
    new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(payload),
    })
  );
}
