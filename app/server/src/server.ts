import Fastify from 'fastify';
import { appRouter } from './router.js';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

export interface ServerOptions {
	port: number;
	host: 'localhost' | '0.0.0.0';
}

export function createServer(opts: ServerOptions) {
	const server = Fastify({ logger: true });

	server.get('/', (_req, _res) => {
		return {
			msg: 'Hello World',
		};
	});

	server.register(fastifyTRPCPlugin, {
		prefix: '/trpc',
		trpcOptions: { router: appRouter },
	});
	const startServer = async () => {
		try {
			void (await server.listen({ port: opts.port, host: opts.host }));
			server.log.info('SUCCESSFUL START');
		} catch (e) {
			console.error(e);
			process.exit(2);
		}
	};
	return { server, startServer };
}
