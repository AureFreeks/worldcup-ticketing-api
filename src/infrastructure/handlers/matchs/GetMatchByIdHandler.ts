import { Context } from "hono";
import {match} from '@mock/match'
import { HTTPException } from 'hono/http-exception'

import { AppDataSource } from "@infrastructure/database/AppDataSource";
//import { ILike } from "typeorm";
import { Match } from "@domain/entities/Match";

export class GetMatchByIdHandler {
    async handle(c: Context) {
        const id = c.req.param('id');
        const matchRepository = AppDataSource.getRepository(Match);
        const match = await matchRepository.findOne({
            where: {
                id: parseInt(id)
            }
        });
        if (!match) {
            throw new HTTPException(404, { message : `Match ${id} does not exist`});
        }
        return c.json({
            success: true,
            message: `Match ${id}`,
            data: { 
                id : parseInt(id)    
            }
        }, 200);
    }
}
