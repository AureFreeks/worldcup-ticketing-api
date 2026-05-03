
import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

//import {city} from "@mock/cities"

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

export class GetCityByNameHandler {
    async handle(c: Context) {
        const name = c.req.param("name");

        //const cityFound = city.find(c => c.name === name);
        try {
            const cityFound = await cityService.findCityByName(name);
            return c.json({
                success: true,
                message : `City ${name}`, 
                data: cityFound
            }, 200);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}