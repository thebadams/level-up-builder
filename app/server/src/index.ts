import { createServer } from './server.js';
const config = {
	port: 8000,
	host: process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0',
} as const;
const server = createServer(config);

server.startServer();
