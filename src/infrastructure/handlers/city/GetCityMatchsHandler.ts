import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

//import { match } from "@mock/match";
//import { city } from "@mock/cities";

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Not, Repository } from "typeorm";
import { CityService } from "@services/CityService";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
const cityRepository : Repository<City> = AppDataSource.getRepository(City);
const matchRepository : Repository<Match> = AppDataSource.getRepository(Match);
const cityService = new CityService(cityRepository, matchRepository);

import { ILike } from "typeorm";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetCityMatchsHandler {
    async handle(c: Context) {
        const name = c.req.param('name');
        //const nameLower = name.toLowerCase();
        //if (!(city.map(c => c.name.toLowerCase()).includes(nameLower))) {
        try {
            await cityService.findCityByName(name);
            //const cityMatchs = match.filter(m => m.stadium.city.name.toLowerCase() === name.toLowerCase());
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
            throw error;
        }
    }
}

