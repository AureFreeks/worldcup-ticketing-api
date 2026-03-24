import { Context } from "hono";
import {FifaCode} from "../../../domain/value-object/FifaCode";
import {teams} from "../../mock/teams";

export class GetTeamsHandler {
    async handle(c: Context) {
        const sort = c.req.query('sort') || "name";
        const name = c.req.query('name') || "";
        if (name) {
            const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(name.toLowerCase()));
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
        if (sort === "name") {
            teams.sort((a, b) => a.name.valueOf().localeCompare(b.name.valueOf()));
        } else if (sort === "-name") {
            teams.sort((a, b) => b.name.valueOf().localeCompare(a.name.valueOf()));
        }
        return c.json({
            success: true,
            message : 'All teams',
            data : teams
        }, 200);   
    }
}
