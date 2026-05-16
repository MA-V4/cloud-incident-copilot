import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const deploymentSchema = z.object({
  service: z.string().min(1),
  version: z.string().min(1),
  status: z.enum(['started', 'succeeded', 'failed', 'rolled_back']),
  timestamp: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export async function deploymentsRoute(server: FastifyInstance) {
  // POST /v1/deployments — ingest a deployment event
  server.post('/deployments', async (req, reply) => {
    const result = deploymentSchema.safeParse(req.body);
    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: 'Invalid payload',
        details: result.error.flatten(),
      });
    }
    // TODO Phase 2: authenticate API key via x-api-key header
    // TODO Phase 3: publish to SQS queue
    return reply.status(202).send({ success: true });
  });
}
