import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
import { match } from "@mock/match";
import { MatchStatus } from "@domain/entities/MatchStatus";

export class GetMatchsByStatusHandler {
    async handle(c: Context) {
        
        const status = c.req.param('status');
        if (!status || MatchStatus[status as keyof typeof MatchStatus] === undefined) {
            throw new HTTPException(400, { message : `Invalid status value: ${status}`});
        }
        const statusEnum = MatchStatus[status as keyof typeof MatchStatus];
        const statusMatchs = match.filter(m => m.status === statusEnum);
        return c.json({
            success: true,
            message: `Matchs with status ${status}`,
            data: statusMatchs
        }, 200);
    }
}