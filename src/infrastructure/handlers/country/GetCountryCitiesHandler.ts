import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
import { countries } from "@mock/Countries";
import { city } from "@mock/cities";

export class GetCountryCitiesHandler {
    async handle(c: Context) {
        const countryCode = c.req.param('code');
        const country = countries.find(c => c.code === countryCode);
        if (!country) {
            throw new HTTPException(404, { message: `Country with code ${countryCode} not found` });
        }
        const cities = city.filter(city => city.country.code === countryCode);
        return c.json({
            success: true,
            message: `Cities in ${country.name}`,
            data: cities
        }, 200);
    }
}