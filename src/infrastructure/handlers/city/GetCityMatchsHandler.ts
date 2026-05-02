import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

import { match } from "@mock/match";
import { city } from "@mock/cities";
export class GetCityMatchsHandler {
    async handle(c: Context) {
        const name = c.req.param('name');
        const nameLower = name.toLowerCase();
        if (!(city.map(c => c.name.toLowerCase()).includes(nameLower))) {
            throw new HTTPException(404, { message: `City ${name} not found`});
        }
        const cityMatchs = match.filter(m => m.stadium.city.name.toLowerCase() === nameLower);
        return c.json({
            success: true,
            message: `Matchs in ${name}`,
            data: cityMatchs
        }, 200);
    }
}

