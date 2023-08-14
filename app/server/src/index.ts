import { createServer } from './server.js';
import type { ServerOptions } from './server.js';
const config = {
	port: 8000,
	host: process.env.NODE_ENV === 'development' ? '0.0.0.0' : 'localhost',
} as ServerOptions;

const server = createServer(config);

server.startServer();
