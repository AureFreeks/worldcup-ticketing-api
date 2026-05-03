import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";

import { NotFoundError } from "@domain/errors/NotFoundError";
import { MatchService } from "@services/MatchService";
import { ValidationError } from "@domain/errors/ValidationError";

const matchRepository = AppDataSource.getRepository(Match);
const matchService = new MatchService(matchRepository);
export class GetMatchsByStageHandler {
    async handle(c: Context) {
        const stage = c.req.param('stage');
        try {
            const stageMatch = await matchService.findMatchByStage(stage);
            return c.json({
                success: true,
                message: `Matchs at stage ${stage}`,
                data: stageMatch
            }, 200);
        } catch (error) {
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
