import { Context } from "hono";
import { city } from "infrastructure/mock/cities";

export class GetCitiesHandler {
    async handle(c: Context) {
        const sort = c.req.query('sort') || "name";
        const name = c.req.query('name') || "";
        if (name) {
            const filteredCities = city.filter(t => t.name.toLowerCase().includes(name.toLowerCase()));
            return c.json({
                success: true,
                message: `Cities filtered by name: ${name}`,
                data: filteredCities
            });
        }

        if (sort && sort !== "name" && sort !== "-name") {
            return c.json({
                success: false,
                message: 'Invalid sort value:'
            }, 400);
        }
        if (sort === "name") {
            city.sort((a, b) => a.name.valueOf().localeCompare(b.name.valueOf()));
        } else if (sort === "-name") {city}
        return c.json({
            success: true,
            message : 'All Cities',
            data : city
        }, 200);   
    }
}