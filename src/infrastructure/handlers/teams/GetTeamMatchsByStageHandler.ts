import { Context } from "hono";
import { FifaCode } from "@domain/value-object/FifaCode";
import {teams} from "@mock/teams";
import { MatchStage } from "@domain/entities/MatchStage";
import { HTTPException } from 'hono/http-exception'
import { match } from "@infrastructure/mock/match";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";

export class GetTeamMatchsByStageHandler {
    async handle(c: Context) {
        const fifaCode = c.req.param('fifaCode');
        if (!fifaCode) {
            throw new HTTPException(400, { message: 'Missing fifaCode parameter' });
        }
        try {
            new FifaCode(fifaCode);
        } catch (error) {
            throw new HTTPException(400, { message: 'Invalid fifaCode parameter' });
        }
        const stageParam = c.req.param('stage');
        if (!stageParam) {
            throw new HTTPException(400, { message: 'Missing stage query parameter'});
        }
        if (!(stageParam in MatchStage)) {
            throw new HTTPException(400, { message: `Invalid stage: "${stageParam}"` });
        }
        const stage = MatchStage[stageParam as keyof typeof MatchStage];
        const teamRepository = AppDataSource.getRepository(Team);
        const team = await teamRepository.find({ where: { code: fifaCode } });
        //const team = teams.find(team => team.code === fifaCode);
        if (!team) {
            throw new HTTPException(404, { message: `Team ${fifaCode} not found` });
        }
        const matchRepository = AppDataSource.getRepository(Match);
        const matches = await matchRepository.find({
            where: [
                { homeTeam: { code: fifaCode }, stage: stage }, 
                { awayTeam: { code: fifaCode }, stage: stage }  
            ],
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: true
            }
        });
        //const matches = match.filter(m => (m.homeTeam.code === fifaCode || m.awayTeam.code === fifaCode) && m.stage === stage);
        return c.json({ 
            success: true,
            message : `Matchs for team ${fifaCode} at stage ${stageParam}`,
            data : matches
            }, 200);
    }
}

