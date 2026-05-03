import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'


import { AppDataSource } from "@infrastructure/database/AppDataSource";

import { Country } from "@domain/entities/Country";
import { Repository } from "typeorm";
import { City } from "@domain/entities/City";
import { CountryService } from "@services/CountryService";
import { NotFoundError } from "@domain/errors/NotFoundError";

const cityRepository : Repository<City> = AppDataSource.getRepository(City);
const countryRepository : Repository<Country> = AppDataSource.getRepository(Country);
const countryService = new CountryService(countryRepository, cityRepository);
export class GetCountryCitiesHandler {
    async handle(c: Context) {
        const countryCode = c.req.param('code');
        try {
            const country = await countryService.findCountryByCode(countryCode);  
            const cities = await countryService.findCitiesByCountryCode(countryCode);
            return c.json({
                success: true,
                message: `Cities in ${country.name}`,
                data: cities
            }, 200); 
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw new HTTPException(500, { message: 'An unexpected error occurred' });
        }
    }
}