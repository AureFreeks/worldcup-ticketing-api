import { Context } from "hono";
import {FifaCode} from "../../../domain/value-object/FifaCode";
import {teams} from "../../mock/teams";
import { HTTPException } from 'hono/http-exception'

export class GetTeamByFifaCodeHandler {
    async handle(c: Context) {
        const codeFifa = c.req.param('fifaCode');
        let teamToFind: FifaCode;
        try {
            const teamToFind = new FifaCode(codeFifa);
        } catch (error) {
            throw new HTTPException(400, { message : 'Invalid FIFA code', error : `Invalid FIFA code: "${codeFifa}"`});
        }
        const team = teams.find(t => t.code.value == codeFifa);
        if (!team) {
            throw new HTTPException(404, { message : `Team ${codeFifa} does not exist`, error : `does not exist`});
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
    }
}

