import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";

import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { MatchService } from "@services/MatchService";

const matchRepository = AppDataSource.getRepository(Match);
const matchService = new MatchService(matchRepository);

export class GetMatchsHandler {
    async handle(c: Context) {
        const pays = c.req.query('team[code]') || "";
        if (pays){
            try {
                const matchFiltre = await matchService.findMatchContainingTeamCountry(pays);
                return c.json({
                    code: pays,
                    success: true,
                    message: `Matchs filtered by team[code]: ${pays}`,
                    data: matchFiltre
                }, 200);
            } catch (error) {
                if (error instanceof NotFoundError) {
                    throw new HTTPException(404, { message: error.message });
                }
                throw error;
            }
        }
        const date = c.req.query('date') || "";
        if (date){
            try {
                const matchFiltre = await matchService.findMatchByDate(date);
                return c.json({
                    date: date,
                    success: true,
                    message: `Matchs filtered by date: ${date}`,
                    data: matchFiltre
                }, 200);
            } catch (error) {
                if (error instanceof NotFoundError) {
                    throw new HTTPException(404, { message: error.message });
                }
                if (error instanceof ValidationError) {
                    throw new HTTPException(400, { message: error.message });
                }
                throw error;
            }
        }
        try {
            const match = await matchService.findAllMatchs();
            return c.json({
                success: true,
                message: "All matchs",
                data : match
            },200);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message: error.message });
            }
            throw error;
        }
    }
}
