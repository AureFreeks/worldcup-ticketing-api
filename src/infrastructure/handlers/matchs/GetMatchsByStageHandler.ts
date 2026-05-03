import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
//import { match } from "@mock/match";
import { MatchStage } from "@domain/entities/MatchStage";

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
import { Match } from "@domain/entities/Match";
export class GetMatchsByStageHandler {
    async handle(c: Context) {
        const stage = c.req.param('stage');
        if (!stage || MatchStage[stage as keyof typeof MatchStage] === undefined) {
            throw new HTTPException(400, { message : `Invalid stage: "${stage}"`});
        }
        const stageEnum = MatchStage[stage as keyof typeof MatchStage];
        const matchRepository = AppDataSource.getRepository(Match);
        
        const stageMatchs = await matchRepository.find({
            where: {
                stage: stageEnum
            }, relations:{
                homeTeam: true,
                awayTeam: true,
                stadium: true
            }
        });
        
        //const stageMatchs = match.filter(m => m.stage === stageEnum);
        return c.json({
            success: true,
            message: `Matchs at stage ${stage}`,
            data: stageMatchs
        }, 200);
    }
}