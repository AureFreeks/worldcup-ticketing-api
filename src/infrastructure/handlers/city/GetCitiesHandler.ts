import { Context } from "hono";
//import { city } from "@mock/cities";
import { HTTPException } from 'hono/http-exception'

import { ILike } from "typeorm";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Repository } from "typeorm";
import { CityService } from "@services/CityService";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
const cityRepository : Repository<City> = AppDataSource.getRepository(City);
const matchRepository : Repository<Match> = AppDataSource.getRepository(Match);
const cityService = new CityService(cityRepository, matchRepository);
export class GetCitiesHandler {
    async handle(c: Context) {
        const name = c.req.query('name') || "";
        if (name) {
            try {
                const city = await cityService.findCityByName(name);
                return c.json({
                    success: true,
                    message: `Cities filtered by name: ${name}`,
                    data: [city]
                }, 200);
            }
            catch (error) {
                if (error instanceof NotFoundError) {
                    throw new HTTPException(404, { message: error.message });
                }
                throw error;
            }
        }
        const sort = c.req.query('sort') || "name";
        if (sort && sort !== "name" && sort !== "-name") {
            throw new HTTPException(400, { message : 'Invalid sort value:'});
        }
        try {
                const city = await cityService.findAllCities(sort);
                return c.json({
                    success: true,
                    message : 'All cities',
                    data : city
                }, 200);   
            }
        catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}