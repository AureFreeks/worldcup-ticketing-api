import { Context } from "hono";
import { HTTPException } from 'hono/http-exception';

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";

import { StadiumService } from "@services/StadiumService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { Match } from "@domain/entities/Match";

const stadiumRepository = AppDataSource.getRepository(Stadium);
const matchRepository = AppDataSource.getRepository(Match);
const stadiumService = new StadiumService(stadiumRepository, matchRepository);

export class GetStadiumByNameHandler {
    async handle(c: Context) {
        const name = c.req.param('name');
        try{ 
            const stadium = await stadiumService.findStadiumByName(name);
            return c.json({
                success: true,
                message: `Stadium ${name}`,
                data: stadium
            }, 200);
        }
        catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message : error.message });
            }
            if (error instanceof ValidationError) {
                throw new HTTPException(400, { message : error.message });
            }
            throw error;
        }
    }
}