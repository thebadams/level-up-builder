import Fastify from 'fastify';

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
