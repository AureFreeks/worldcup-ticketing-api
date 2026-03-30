import { Hono } from 'hono'
import { GetCountriesHandler } from 'infrastructure/handlers/country/GetCountriesHandler'


export const countryRouter = new Hono()

countryRouter.get('', (c) => new GetCountriesHandler().handle(c))