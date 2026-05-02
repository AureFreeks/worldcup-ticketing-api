import { Hono } from 'hono'
import { GetCountriesHandler } from '@handlers/country/GetCountriesHandler'
import { GetCountriesByCodeHandler } from '@handlers/country/GetCountriesByCodeHandler'
import { GetCountryCitiesHandler } from '@handlers/country/GetCountryCitiesHandler'
export const countryRouter = new Hono()

countryRouter.get('/:code/cities', (c) => new GetCountryCitiesHandler().handle(c));
countryRouter.get('/:codeCountry', (c) => new GetCountriesByCodeHandler().handle(c));
countryRouter.get('', (c) => new GetCountriesHandler().handle(c));
