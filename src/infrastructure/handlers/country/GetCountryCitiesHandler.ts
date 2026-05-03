import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
//import { countries } from "@mock/Countries";
//import { city } from "@mock/cities";

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
export class GetCountryCitiesHandler {
    async handle(c: Context) {
        const countryCode = c.req.param('code');
        //const country = countries.find(c => c.code === countryCode);
        const countryRepository = AppDataSource.getRepository(Country);
        const country = await countryRepository.findOne({
            where: {
                code: countryCode
            }
        });
        if (!country) {
            throw new HTTPException(404, { message: `Country "${countryCode}" does not exist` });
        }
        const cityRepository = AppDataSource.getRepository(City);
        const cities = await cityRepository.find({
            where: {
                country: {
                    code: countryCode
                }
            }, relations:
                {
                    country: true
                } 
            
        });
        //const cities = city.filter(city => city.country.code === countryCode);
        return c.json({
            success: true,
            message: `Cities in ${country.name}`,
            data: cities
        }, 200);
    }
}