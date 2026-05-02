import { Hono } from 'hono';
import { GetCitiesHandler } from '@handlers/city/GetCitiesHandler';
import { GetCityMatchsHandler } from '@handlers/city/GetCityMatchsHandler';
import { GetCityByNameHandler } from '@handlers/city/GetCityByNameHandler';
export const citiesRouter = new Hono();

citiesRouter.get('', (c) => new GetCitiesHandler().handle(c))
citiesRouter.get('/:name/matchs', (c) => new GetCityMatchsHandler().handle(c))
citiesRouter.get('/:name', (c) => new GetCityByNameHandler().handle(c))