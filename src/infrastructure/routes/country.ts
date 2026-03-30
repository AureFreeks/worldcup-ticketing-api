import { Hono } from 'hono'
import { GetCountriesHandler } from 'infrastructure/handlers/country/GetCountriesHandler'
import { GetCountriesByCodeHandler } from 'infrastructure/handlers/country/GetCountriesByCodeHandler'

export const countryRouter = new Hono()

countryRouter.get('', (c) => new GetCountriesHandler().handle(c));
countryRouter.get('/:codeCountry', (c) => new GetCountriesByCodeHandler().handle(c));