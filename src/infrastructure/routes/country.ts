import { Hono } from 'hono'
import { GetCountriesHandler } from 'infrastructure/handlers/country/GetCountriesHandler'


export const CountryRouter = new Hono()

CountryRouter.get('', (c) => new GetCountriesHandler().handle(c))