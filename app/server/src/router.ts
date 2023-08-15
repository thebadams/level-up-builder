import { publicProcedure, router } from './trpc.js';

export const appRouter = router({
	hello: publicProcedure.query(() => {
		return { msg: 'Hello World' };
	}),
});

export type AppRouter = typeof appRouter;
