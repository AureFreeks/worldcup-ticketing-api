import { Hono } from 'hono'
import { GetStadiumsHandler } from '../handlers/stadium/GetStadiumsHandler';

export const stadiumsRouter = new Hono()

stadiumsRouter.get('/', (c) => new GetStadiumsHandler().handle(c));
