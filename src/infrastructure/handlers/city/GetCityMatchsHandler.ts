import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Repository } from "typeorm";
import { CityService } from "@services/CityService";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
const cityRepository : Repository<City> = AppDataSource.getRepository(City);
const matchRepository : Repository<Match> = AppDataSource.getRepository(Match);
const cityService = new CityService(cityRepository, matchRepository);

import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetCityMatchsHandler {
    async handle(c: Context) {
        const name = c.req.param('name');
        try {
            await cityService.findCityByName(name);
            const cityMatchs = await cityService.findMatchByCityName(name);
            return c.json({
                success: true,
                message: `Matchs in ${name}`,
                data: cityMatchs
            }, 200);
        }catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw new HTTPException(500, { message: 'An unexpected error occurred' });
        }
    }
}

