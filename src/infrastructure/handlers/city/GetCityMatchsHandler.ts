import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

import { match } from "@mock/match";
import { city } from "@mock/cities";

import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";

export class GetCityMatchsHandler {
    async handle(c: Context) {
        const name = c.req.param('name');
        //const nameLower = name.toLowerCase();
        //if (!(city.map(c => c.name.toLowerCase()).includes(nameLower))) {
        const cityRepository = AppDataSource.getRepository(City);
        const cityFound = await cityRepository.findOne({
            where: {
                name: ILike(`%${name}%`)
            }
        });
        if (!cityFound) {
            throw new HTTPException(404, { message: `City "${name}" does not exist`});
        }
        
        //const cityMatchs = match.filter(m => m.stadium.city.name.toLowerCase() === name.toLowerCase());
        
        const matchRepository = AppDataSource.getRepository(Match);
        const cityMatchs = await matchRepository.find({
            where: {
                stadium: {
                    city: {
                        name: ILike(`%${name}%`)
                    }
                }
            },relations: {
                    stadium: {
                        city: true
                    },
                    homeTeam: true,
                    awayTeam: true
            }
        });
        return c.json({
            success: true,
            message: `Matchs in ${name}`,
            data: cityMatchs
        }, 200);
    }
}

