import { Context } from "hono";
import { match } from "infrastructure/mock/match";

export class GetMatchsHandler {
    async handle(c: Context) {
        const pays = c.req.query('team[code]') || "";
        const matchFiltre = pays ? match.filter(m => m.homeTeam.code.value === pays || m.awayTeam.code.value === pays) : match;
        const messageRetour = pays ? `Matchs filtered by team[code]: ${pays}` : "All matchs";
        return c.json({
            code: pays,
            success: true,
            message: messageRetour,
            data : matchFiltre
        },200);
    }
}
