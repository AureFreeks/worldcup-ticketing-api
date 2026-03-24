import { Hono } from 'hono'
import { GetMatchsHandler } from '../handlers/matchs/GetMatchsHandler';
import { GetMatchByIdHandler } from '../handlers/matchs/GetMatchByIdHandler';

export const matchsRouter = new Hono()

matchsRouter.get('',(c) => new GetMatchsHandler().handle(c));

matchsRouter.get('/:id', (c) => new GetMatchByIdHandler().handle(c));