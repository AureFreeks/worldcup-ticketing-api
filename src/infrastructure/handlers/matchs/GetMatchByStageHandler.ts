import { Context } from "hono";
import {match} from '../../mock/match'
import { MatchStage } from "domain/entities/MatchStage";
import { HTTPException } from 'hono/http-exception'

export class GetMatchByStageHandler {
    async handle(c: Context) {
        const stage = c.req.param('stage');
        if (!stage || MatchStage[stage as keyof typeof MatchStage] === undefined) {
            throw new HTTPException(400, { message : `Invalid stage value: ${stage}`});
        }
        const stageEnum = MatchStage[stage as keyof typeof MatchStage];
        return c.json({
            success: true,
            message: `Match with stage ${stage} found :`,
            data: match.filter(m => m.stage === stageEnum)
        }, 200);
    }
}
