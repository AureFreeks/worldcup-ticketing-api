import { Context } from "hono";
import {FifaCode} from "@domain/value-object/FifaCode";
import {teams} from "@mock/teams";
import {match} from "@mock/match";
import { HTTPException } from 'hono/http-exception'

export class GetTeamMatchsByFifaCodeHandler {
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
        const team = teams.find(team => team.code.value === fifaCode);
        if (!team) {
            throw new HTTPException(404, { message: `Team ${fifaCode} not found` });
        }
        const matches = match.filter(m => m.homeTeam.code.value === fifaCode || m.awayTeam.code.value === fifaCode);
        return c.json({ 
            success: true,
            message : `Matchs for team ${fifaCode}`,
            data : matches
            }, 200);
    }
}

