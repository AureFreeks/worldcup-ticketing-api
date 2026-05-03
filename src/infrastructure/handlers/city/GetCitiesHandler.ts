import { Context } from "hono";
//import { city } from "@mock/cities";
import { HTTPException } from 'hono/http-exception'

import { City } from "@domain/entities/City";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
export class GetCitiesHandler {
    async handle(c: Context) {
        const name = c.req.query('name') || "";
        const cityRepository = AppDataSource.getRepository(City);
        if (name) {
            //const filteredCities = city.filter(t => t.name.toLowerCase().includes(name.toLowerCase()));
            const filteredCities = await cityRepository.find({
                where: {
                    name: ILike(`%${name}%`)
                }
            });
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
        /*
        if (sort === "name") {
            city.sort((a, b) => a.name.valueOf().localeCompare(b.name.valueOf()));
        } else if (sort === "-name") {
            city.sort((a, b) => b.name.valueOf().localeCompare(a.name.valueOf()));
        }
        */
        const city = await cityRepository.find({
            order: {
                name: sort === "name" ? "ASC" : "DESC"
            },
            relations: {country: true}
        });
        
        return c.json({
            success: true,
            message : 'All cities',
            data : city
        }, 200);   
    }
}