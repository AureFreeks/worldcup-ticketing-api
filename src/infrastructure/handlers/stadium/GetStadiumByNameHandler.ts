import { Context } from "hono";
import { HTTPException } from 'hono/http-exception';
import { stadiums } from "@mock/stadiums";

export class GetStadiumByNameHandler {
    async handle(c: Context) {
        const name = c.req.param('name');
        if (!name) {
            throw new HTTPException(400, { message : 'Name parameter is required'});
        }
        const foundStadium = stadiums.find(s => s.name.toLowerCase() === name.toLowerCase());
        if (!foundStadium) {
            throw new HTTPException(404, { message : 'Stadium not found'});
        }
        return c.json({
            success: true,
            message: `Stadium ${name}`,
            data: foundStadium
        }, 200);
    }
}