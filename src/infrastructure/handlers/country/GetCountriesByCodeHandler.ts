import { Context } from "hono";
//import { countries } from "@mock/Countries";

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { HTTPException } from "hono/http-exception";

import { Country } from "@domain/entities/Country";
import { Not, Repository } from "typeorm";
import { City } from "@domain/entities/City";
import { CountryService } from "@services/CountryService";
import { NotFoundError } from "@domain/errors/NotFoundError";

const cityRepository : Repository<City> = AppDataSource.getRepository(City);
const countryRepository : Repository<Country> = AppDataSource.getRepository(Country);
const countryService = new CountryService(countryRepository, cityRepository);

export class GetCountriesByCodeHandler {
    async handle(c: Context) {
        const codePays = c.req.param('codeCountry') || "";
        try {
            const country = await countryService.findCountryByCode(codePays);
            return c.json({
                success: true,
                message : `Country ${country.name}`,
                data : country
            }, 200); 
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            if (error instanceof ValidationError) {
                throw new HTTPException(400, { message: error.message });
            }
            throw error;
        }
    }
}