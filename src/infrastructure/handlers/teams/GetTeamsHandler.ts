import { Context } from "hono";
import { AppDataSource } from "@database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { HTTPException } from "hono/http-exception";

import { TeamService } from "@services/TeamService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Match } from "@domain/entities/Match";
import { ValidationError } from "@domain/errors/ValidationError";

const teamRepository = AppDataSource.getRepository(Team);
const matchRepository = AppDataSource.getRepository(Match);
const teamService = new TeamService(teamRepository, matchRepository);
export class GetTeamsHandler {
    async handle(c: Context) {
        const sort = c.req.query('sort') || "name";
        const name = c.req.query('name') || "";
        if (name) {
            try {
                const teams = await teamService.findMatchName(name);
                return c.json({
                    success: true,
                    message: `Teams filtered by name: ${name}`,
                    data: teams
                });
            } catch (error) {
                if (error instanceof NotFoundError) {
                    throw new HTTPException(404, { message: error.message });
                }
                throw new HTTPException(500, { message: 'An unexpected error occurred' });
            }
        }
        try {
            const teams = await teamService.findAllTeams(sort);
            return c.json({
                success: true,
                message : 'All teams',
                data : teams,
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
