import { Context } from "hono";
//import {stadiums} from "@mock/stadiums";
//import {match} from "@mock/match";
import { HTTPException } from 'hono/http-exception'

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";
export class GetStadiumMatchsHandler {
    async handle(c: Context) {
        const stadeName = c.req.param('name');
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        const stadium = await stadiumRepository.findOne({
            where: {
                name: ILike(stadeName)
            }
        });
        //const stadium = stadiums.find(s => s.name.toLowerCase() === cityName.toLowerCase());
        if (!stadium) {
            throw new HTTPException(404, { message: `Stadium "${stadeName}" does not exist` });
        }
        const matchRepository = AppDataSource.getRepository(Match);
        const stadiumMatchs = await matchRepository.find({
            where: {
                stadium: {
                    name: ILike(stadeName)
                }            },
            relations: 
            {
                homeTeam: true,
                awayTeam: true,
                stadium: {
                    city: {
                        country : true
                    }
                }
            }
        });
        //const stadiumMatchs = match.filter(m =>  m.stadium.name.toLowerCase() === stadium.name.toLowerCase());
        return c.json({
            success: true,
            message : `Matchs at ${stadeName} Stadium`,
            data : stadiumMatchs
        }, 200);
    }
}

