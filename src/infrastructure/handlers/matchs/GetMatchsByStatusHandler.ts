import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
import { MatchStatus } from "@domain/entities/MatchStatus";

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { MatchService } from "@services/MatchService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";

const matchRepository = AppDataSource.getRepository(Match);
const matchService = new MatchService(matchRepository);
export class GetMatchsByStatusHandler {
    async handle(c: Context) {
        
        const status = c.req.param('status');
        try {
            const statusMatchs = await matchService.findMatchByStatus(status);
            return c.json({
                success: true,
                message: `Matchs with status ${status}`,
                data: statusMatchs
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