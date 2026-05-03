import { Context } from "hono";
import { HTTPException } from 'hono/http-exception';
//import { stadiums } from "@mock/stadiums";


import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
import { Stadium } from "@domain/entities/Stadium";

export class GetStadiumByNameHandler {
    async handle(c: Context) {
        const name = c.req.param('name');
        if (!name) {
            throw new HTTPException(400, { message : 'Name parameter is required'});
        }
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        const foundStadium = await stadiumRepository.findOne({
            where: {
                name: ILike(name)
            },relations: ['city']
        });
        //const foundStadium = stadiums.find(s => s.name.toLowerCase() === name.toLowerCase());
        if (!foundStadium) {
            throw new HTTPException(404, { message : `Stadium "${name}" does not exist`});
        }
        return c.json({
            success: true,
            message: `Stadium ${name}`,
            data: foundStadium
        }, 200);
    }
}