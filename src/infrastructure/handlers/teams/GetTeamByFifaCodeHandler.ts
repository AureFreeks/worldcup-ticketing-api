import { Context } from "hono";
import { FifaCode } from "@domain/value-object/FifaCode";
import { HTTPException } from 'hono/http-exception'
import { AppDataSource } from "@database/AppDataSource";
import { Team } from "@domain/entities/Team";

import { TeamService } from "@services/TeamService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Match } from "@domain/entities/Match";
import { ValidationError } from "@domain/errors/ValidationError";

const teamRepository = AppDataSource.getRepository(Team);
const matchRepository = AppDataSource.getRepository(Match);
const teamService = new TeamService(teamRepository, matchRepository);

export class GetTeamByFifaCodeHandler {
    async handle(c: Context) {
        const codeFifa = c.req.param('fifaCode');
        try {
            const team = await teamService.findTeamByFifaCode(codeFifa);
            return c.json({
                success: true,
                message: `Team ${codeFifa}`,
                data: {
                    name : team.name,
                    code : {
                        value : team.code
                    }
                }
            }, 200);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message : error.message });
            }
            if (error instanceof ValidationError) {
                throw new HTTPException(400, { message : error.message });
            }
            throw new HTTPException(500, { message: 'An unexpected error occurred' });
        }
    }
}

