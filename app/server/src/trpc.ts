import { inferAsyncReturnType, initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const router = t.router;

export const publicProcedure = t.procedure;

export type AppRouter = inferAsyncReturnType<typeof router>;
