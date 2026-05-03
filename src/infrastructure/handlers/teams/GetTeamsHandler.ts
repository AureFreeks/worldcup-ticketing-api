import { Context } from "hono";
//import {FifaCode} from "../../../domain/value-object/FifaCode";
import { AppDataSource } from "@database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { ILike } from "typeorm";
import { HTTPException } from "hono/http-exception";
export class GetTeamsHandler {
    async handle(c: Context) {
        const sort = c.req.query('sort') || "name";
        const name = c.req.query('name') || "";
        const teamRepository = AppDataSource.getRepository(Team);
        if (name) {
            /*
            const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(name.toLowerCase()));
            */
            const filteredTeams = await teamRepository.find({
                where: { name: ILike(`%${name}%`) }
            });
            if (!filteredTeams) {
                throw new HTTPException(404, { message: `No team found with name containing '${name}'` });
            }
            return c.json({
                success: true,
                message: `Teams filtered by name: ${name}`,
                data: filteredTeams
            });
        }

        if (sort && sort !== "name" && sort !== "-name") {
            return c.json({
                success: false,
                message: 'Invalid sort value:'
            }, 400);
        }
        const teams = await teamRepository.find({
                order: { name: sort === "-name" ? "DESC" : "ASC" }
            }
        );
        return c.json({
            success: true,
            message : 'All teams',
            data : teams,
        }, 200);   
    }
}
