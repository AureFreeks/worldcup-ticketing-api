import { Context } from "hono";
import { FifaCode } from "@domain/value-object/FifaCode";
import { MatchStage } from "@domain/entities/MatchStage";
import { HTTPException } from 'hono/http-exception'
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";

import { TeamService } from "@services/TeamService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Match } from "@domain/entities/Match";
import { ValidationError } from "@domain/errors/ValidationError";

const teamRepository = AppDataSource.getRepository(Team);
const matchRepository = AppDataSource.getRepository(Match);
const teamService = new TeamService(teamRepository, matchRepository);

export class GetTeamMatchsByStageHandler {
    async handle(c: Context) {
        const fifaCode = c.req.param('fifaCode');
        const stageParam = c.req.param('stage');
        try {
            await teamService.findTeamByFifaCode(fifaCode);
            const matches = await teamService.findMatchsByTeamAndStage(fifaCode, stageParam);
            return c.json({ 
                success: true,
                message : `Matchs for team ${fifaCode} at stage ${stageParam}`,
                data : matches
            }, 200);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: `Team with FIFA code "${fifaCode}" does not exist` });
            }
            if (error instanceof ValidationError) {
                throw new HTTPException(400, { message: error.message });
            }
            throw new HTTPException(500, { message: 'An unexpected error occurred' });
        }
    }
}

