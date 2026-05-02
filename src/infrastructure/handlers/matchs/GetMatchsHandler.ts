import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
import { match } from "@mock/match";

export class GetMatchsHandler {
    async handle(c: Context) {
        const pays = c.req.query('team[code]') || "";
        if (pays){
            const matchFiltre = match.filter(m => m.homeTeam.code.value === pays || m.awayTeam.code.value === pays);
            return c.json({
                code: pays,
                success: true,
                message: `Matchs filtered by team[code]: ${pays}`,
                data: matchFiltre
            }, 200);
        }
        const date = c.req.query('date') || "";
        if (date){
            if (date.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
                throw new HTTPException(400, "Invalid date format. Expected format: YYYY-MM-DD");
            }
            const matchFiltre = match.filter(m => m.date.toISOString().split('T')[0] === date);
            return c.json({
                date: date,
                success: true,
                message: `Matchs filtered by date: ${date}`,
                data: matchFiltre
            }, 200);
        }
        return c.json({
            success: true,
            message: "All matchs",
            data : match
        },200);
    }
}
