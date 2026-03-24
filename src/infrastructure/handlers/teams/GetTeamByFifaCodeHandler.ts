import { Context } from "hono";
import {FifaCode} from "../../../domain/value-object/FifaCode";
import {teams} from "../../mock/teams";

export class GetTeamByFifaCodeHandler {
    async handle(c: Context) {
        const codeFifa = c.req.param('fifaCode');
        try {
            const teamToFind = new FifaCode(codeFifa);
            const team = teams.find(t => t.code.value == codeFifa);
            if (!team) {
                return c.json({
                    success: false,
                    message: `Team ${codeFifa}`,
                    error : "does not exist"
                }, 404);
            }
            return c.json({
                success: true,
                message: `Team ${codeFifa}`,
                data: {
                    name : team.name,
                    code : {
                        value : team.code.value
                    }
                }
            }, 200);
        } catch (error) {
            return c.json({
                success: false,
                message: 'Invalid FIFA code',
                error : `Invalid FIFA code: "${codeFifa}"`
            }, 400);
        }
    }
}

