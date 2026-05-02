import { Context } from "hono";
import { city } from "@mock/cities";
import { HTTPException } from 'hono/http-exception'


export class GetCitiesHandler {
    async handle(c: Context) {
        const name = c.req.query('name') || "";
        if (name) {
            const filteredCities = city.filter(t => t.name.toLowerCase().includes(name.toLowerCase()));
            return c.json({
                success: true,
                message: `Cities filtered by name: ${name}`,
                data: filteredCities
            });
        }
        
        const sort = c.req.query('sort') || "name";
        if (sort && sort !== "name" && sort !== "-name") {
            throw new HTTPException(400, { message : 'Invalid sort value:'});
        }
        if (sort === "name") {
            city.sort((a, b) => a.name.valueOf().localeCompare(b.name.valueOf()));
        } else if (sort === "-name") {
            city.sort((a, b) => b.name.valueOf().localeCompare(a.name.valueOf()));
        }
        return c.json({
            success: true,
            message : 'All cities',
            data : city
        }, 200);   
    }
}