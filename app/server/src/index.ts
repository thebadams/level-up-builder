import Fastify from 'fastify';

const server = Fastify({ logger: true });

server.get('/', (_request, _reply) => {
	return 'Hello World';
});

try {
	await server.listen({ port: 8000 });
	server.log.info('SUCCESSFUL START');
} catch (error) {
	server.log.error(error);
	process.exit(2);
}
