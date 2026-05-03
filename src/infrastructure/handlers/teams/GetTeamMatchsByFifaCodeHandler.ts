import { Context } from "hono";
import {FifaCode} from "@domain/value-object/FifaCode";
import {teams} from "@mock/teams";
import {match} from "@mock/match";
import { HTTPException } from 'hono/http-exception'
import { AppDataSource } from "@database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";

export class GetTeamMatchsByFifaCodeHandler {
    async handle(c: Context) {
        const fifaCode = c.req.param('fifaCode');
        if (!fifaCode) {
            throw new HTTPException(400, { message: 'Missing fifaCode parameter' });
        }
        try {
            new FifaCode(fifaCode);
        } catch (error) {
            throw new HTTPException(400, { message: `Invalid FIFA code: "${fifaCode}"` });
        }
        const teamRepository = AppDataSource.getRepository(Team);
        const team = await teamRepository.find({ where: { code: fifaCode } });
        if (!team) {
            throw new HTTPException(404, { message: `Team ${fifaCode} not found` });
        }
        const matchRepository = AppDataSource.getRepository(Match);
        const matches = await matchRepository.find({
            where: [
                { homeTeam: { code : fifaCode }},
                { awayTeam: { code: fifaCode } }
            ],
            relations: {
                homeTeam: true,  
                awayTeam: true,  
                stadium: true   
            }
        });
        //
        //const matches = match.filter(m => m.homeTeam.code === fifaCode || m.awayTeam.code === fifaCode);
        return c.json({ 
            success: true,
            message : `Matchs for team ${fifaCode}`,
            data : matches
            }, 200);
    }
}

