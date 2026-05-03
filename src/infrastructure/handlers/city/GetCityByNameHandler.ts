
import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

import {city} from "@mock/cities"
import { City } from "@domain/entities/City";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
export class GetCityByNameHandler {
    async handle(c: Context) {
        const name = c.req.param("name");

        //const cityFound = city.find(c => c.name === name);
        const cityRepository = AppDataSource.getRepository(City);
        const cityFound = await cityRepository.findOne({
            where: {
                name: ILike(`%${name}%`)
            }, relations: {country: true}
        });
        if (!cityFound) {
            throw new HTTPException(404, { message: `City "${name}" does not exist` });
        }
        return c.json({
            success: true,
            message : `City ${name}`, 
            data: cityFound
        }, 200);
    }
}