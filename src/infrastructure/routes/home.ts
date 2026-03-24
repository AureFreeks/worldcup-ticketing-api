import { Hono } from 'hono'
import { GetHealthHandler } from '../handlers/home/GetHealthHandler';
import { GetHomeHandler } from '../handlers/home/GetHomeHandler';

export const homeRouter = new Hono();

homeRouter.get('', (c) => new GetHomeHandler().handle(c))
homeRouter.get('health', (c) => new GetHealthHandler().handle(c))


