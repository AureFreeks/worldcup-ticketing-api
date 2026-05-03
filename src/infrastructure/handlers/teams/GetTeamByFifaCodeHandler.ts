import { Context } from "hono";
import { FifaCode } from "@domain/value-object/FifaCode";
import { HTTPException } from 'hono/http-exception'
import { AppDataSource } from "@database/AppDataSource";
import { Team } from "@domain/entities/Team";
export class GetTeamByFifaCodeHandler {
    async handle(c: Context) {
        const codeFifa = c.req.param('fifaCode');
        try {
            new FifaCode(codeFifa);
        } catch (error) {
            throw new HTTPException(400, { message : `Invalid FIFA code: "${codeFifa}"`, cause : `Invalid FIFA code: "${codeFifa}"`});
        }
        const teamRepository = AppDataSource.getRepository(Team);
        const team = await teamRepository.findOne({ where: { code: codeFifa } });
        if (!team) {
            throw new HTTPException(404, { message : `Team ${codeFifa} does not exist`, cause : `does not exist`});
        }
        return c.json({
            success: true,
            message: `Team ${codeFifa}`,
            data: {
                name : team.name,
                code : {
                    value : team.code
                }
            }
        }, 200);
    }
}

