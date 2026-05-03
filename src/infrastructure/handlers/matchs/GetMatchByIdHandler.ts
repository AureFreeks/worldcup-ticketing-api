import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { MatchService } from "@services/MatchService";

const matchRepository = AppDataSource.getRepository(Match);
const matchService = new MatchService(matchRepository);
export class GetMatchByIdHandler {
    async handle(c: Context) {
        const id = c.req.param('id');
        try {
            const match = await matchService.findMatchById(parseInt(id));
            return c.json({
                success: true,
                message: `Match ${id}`,
                data: match
            }, 200);
        }
        catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            if (error instanceof ValidationError) {
                throw new HTTPException(400, { message: error.message });
            }
            throw new HTTPException(500, { message: 'An unexpected error occurred' });
        }
    }
}
