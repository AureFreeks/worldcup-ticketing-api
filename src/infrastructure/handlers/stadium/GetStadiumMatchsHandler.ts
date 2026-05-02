import { Context } from "hono";
import {stadiums} from "@mock/stadiums";
import {match} from "@mock/match";
import { HTTPException } from 'hono/http-exception'

export class GetStadiumMatchsHandler {
    async handle(c: Context) {
        const cityName = c.req.param('name');
        const stadium = stadiums.find(s => s.name.toLowerCase() === cityName.toLowerCase());
        if (!stadium) {
            throw new HTTPException(404, { message: `Stadium ${cityName} not found` });
        }
        const stadiumMatchs = match.filter(m =>  m.stadium.name.toLowerCase() === stadium.name.toLowerCase());
        return c.json({
            success: true,
            message : `Matchs at ${cityName} Stadium`,
            data : stadiumMatchs
        }, 200);
    }
}

