
import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

import {city} from "@mock/cities"

export class GetCityByNameHandler {
    async handle(c: Context) {
        const name = c.req.param("name");

        const cityFound = city.find(c => c.name === name);
        if (!cityFound) {
            throw new HTTPException(404, "City not found");
        }
        return c.json({
            success: true,
            message : `City ${name}`, 
            data: cityFound
        }, 200);
    }
}