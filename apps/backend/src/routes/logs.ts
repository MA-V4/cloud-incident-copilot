import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const logSchema = z.object({
  service: z.string().min(1),
  level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']),
  message: z.string().min(1),
  timestamp: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

const logBatchSchema = z.object({
  events: z.array(logSchema).min(1).max(100),
});

export async function logsRoute(server: FastifyInstance) {
  // POST /v1/logs — ingest a single log event
  server.post('/logs', async (req, reply) => {
    const result = logSchema.safeParse(req.body);
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

  // POST /v1/logs/batch — ingest multiple log events
  server.post('/logs/batch', async (req, reply) => {
    const result = logBatchSchema.safeParse(req.body);
    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: 'Invalid payload',
        details: result.error.flatten(),
      });
    }
    // TODO Phase 2: authenticate API key via x-api-key header
    // TODO Phase 3: publish batch to SQS queue
    return reply.status(202).send({
      success: true,
      data: { accepted: result.data.events.length },
    });
  });
}
