import { Hono } from 'hono'
import { GetMatchsHandler } from '@handlers/matchs/GetMatchsHandler';
import { GetMatchByIdHandler } from '@handlers/matchs/GetMatchByIdHandler';
import { GetMatchsByStageHandler } from '@handlers/matchs/GetMatchsByStageHandler';
import { GetMatchsByStatusHandler } from '@handlers/matchs/GetMatchsByStatusHandler';
export const matchsRouter = new Hono()

matchsRouter.get('',(c) => new GetMatchsHandler().handle(c));
matchsRouter.get('/stages/:stage', (c) => new GetMatchsByStageHandler().handle(c));
matchsRouter.get('/status/:status', (c) => new GetMatchsByStatusHandler().handle(c));
matchsRouter.get('/:id', (c) => new GetMatchByIdHandler().handle(c));
