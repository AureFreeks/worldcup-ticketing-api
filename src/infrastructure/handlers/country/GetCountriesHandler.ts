import { Context } from "hono";
//import { countries } from "@mock/Countries";
import { HTTPException } from 'hono/http-exception'

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";

import { Country } from "@domain/entities/Country";
import { Repository } from "typeorm";
import { City } from "@domain/entities/City";
import { CountryService } from "@services/CountryService";

import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
const cityRepository : Repository<City> = AppDataSource.getRepository(City);
const countryRepository : Repository<Country> = AppDataSource.getRepository(Country);
const countryService = new CountryService(countryRepository, cityRepository);

export class GetCountriesHandler {
    async handle(c: Context) {
        const sort = c.req.query('sort') || "name";
        const countryname = c.req.query('countries[name]') || "";
        if (countryname) {
            try {
                const country = await countryService.findCountryByName(countryname);
                return c.json({
                    success: true,
                    message : `Country with name like ${countryname}`,
                    data : country
                }, 200); 
            } catch (error) {
                if (error instanceof NotFoundError) {
                    throw new HTTPException(404, { message: error.message });
                }                
                throw error;
            }
        }
        try {
            const countries = await countryService.findAllCountries(sort);
            return c.json({
                success: true,
                message : 'All countries',
                data : countries
            }, 200); 
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            if (error instanceof ValidationError) {
                throw new HTTPException(400, { message: error.message });
            }
            throw new HTTPException(500, { message: 'An unexpected error occurred' });
        }
    }
}