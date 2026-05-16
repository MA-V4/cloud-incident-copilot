import { FastifyInstance } from 'fastify';

export async function healthRoute(server: FastifyInstance) {
  server.get('/health', async (_req, reply) => {
    return reply.status(200).send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'cloud-incident-copilot-api',
    });
  });
}
