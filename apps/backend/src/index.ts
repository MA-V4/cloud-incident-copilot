import Fastify from 'fastify';
import cors from '@fastify/cors';
import { healthRoute } from './routes/health';
import { logsRoute } from './routes/logs';
import { deploymentsRoute } from './routes/deployments';

const server = Fastify({ logger: true });

async function main() {
  await server.register(cors, { origin: true });

  // Routes
  server.register(healthRoute);
  server.register(logsRoute, { prefix: '/v1' });
  server.register(deploymentsRoute, { prefix: '/v1' });

  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST || '0.0.0.0';

  try {
    await server.listen({ port, host });
    console.log(`Backend running on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
