import { Context } from "hono";
import { FifaCode } from "@domain/value-object/FifaCode";
import {teams} from "@mock/teams";
import { MatchStage } from "@domain/entities/MatchStage";
import { HTTPException } from 'hono/http-exception'
import { match } from "@infrastructure/mock/match";

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
            throw new HTTPException(400, { message: 'Invalid stage query parameter' });
        }
        const stage = MatchStage[stageParam as keyof typeof MatchStage];
        const team = teams.find(team => team.code.value === fifaCode);
        if (!team) {
            throw new HTTPException(404, { message: `Team ${fifaCode} not found` });
        }
        const matches = match.filter(m => (m.homeTeam.code.value === fifaCode || m.awayTeam.code.value === fifaCode) && m.stage === stage);
        return c.json({ 
            success: true,
            message : `Matchs for team ${fifaCode}  at stage ${stageParam}`,
            data : matches
            }, 200);
    }
}

