import { Hono } from 'hono';
import { GetCitiesHandler } from '../handlers/city/GetCitiesHandler';

export const citiesRouter = new Hono();

citiesRouter.get('', (c) => new GetCitiesHandler().handle(c))