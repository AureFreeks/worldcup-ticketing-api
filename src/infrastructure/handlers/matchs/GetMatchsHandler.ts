import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
//import { match } from "@mock/match";

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
import { Match } from "@domain/entities/Match";
export class GetMatchsHandler {
    async handle(c: Context) {
        const pays = c.req.query('team[code]') || "";
        const matchRepository = AppDataSource.getRepository(Match);
        if (pays){
            //const matchFiltre = match.filter(m => m.homeTeam.code.value === pays || m.awayTeam.code.value === pays);
            const matchFiltre = await matchRepository.find({
                where: [
                    { homeTeam: { code: ILike(pays) } },
                    { awayTeam: { code: ILike(pays) } }
                ],
            relations: {
                    homeTeam: true, 
                    awayTeam: true,
                    stadium: {
                        city: {
                            country: true 
                        }
                    }
                }
            });
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
                throw new HTTPException(400, { message: "Invalid date format. Expected format: YYYY-MM-DD" });
            }
            //const matchFiltre = match.filter(m => m.date.toISOString().split('T')[0] === date);
            const matchFiltre = await matchRepository.find({
                where: { date: new Date(date) },
                relations: {
                    homeTeam: true, 
                    awayTeam: true,
                    stadium: {
                        city: {
                            country: true 
                        }
                    }
                }
            });
            return c.json({
                date: date,
                success: true,
                message: `Matchs filtered by date: ${date}`,
                data: matchFiltre
            }, 200);
        }
        const match = await matchRepository.find({ relations: {
                homeTeam: true, 
                awayTeam: true,
                stadium: {
                    city: {
                        country: true 
                    }
                }
            }
        });
        return c.json({
            success: true,
            message: "All matchs",
            data : match
        },200);
    }
}
