import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * API key authentication middleware.
 * Expects the key in the x-api-key header.
 *
 * TODO Phase 2: implement real key lookup + hash comparison against
 * the DynamoDB ApiKeys table. Update lastUsedAt on success.
 */
export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || typeof apiKey !== 'string') {
    return reply.status(401).send({ success: false, error: 'Missing or invalid API key' });
  }
  // Placeholder — wire up DynamoDB lookup in Phase 2
}
