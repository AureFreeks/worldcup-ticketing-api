import { DataSource } from "typeorm"

import { City } from "@domain/entities/City"
import { Country } from "@domain/entities/Country"
import { Match } from "@domain/entities/Match"


import { Stadium } from "@domain/entities/Stadium"
import { Team } from "@domain/entities/Team"
import { Ticket } from "@domain/entities/Ticket"


import "reflect-metadata"; //typeorm


import { city } from "@mock/cities";
import { match } from "@mock/match";
import { stadiums } from "@mock/stadiums";
import { teams } from "@mock/teams";
import { AppDataSource } from "./AppDataSource"
import { countries } from "@mock/Countries"
import { tickets } from "@mock/ticket";

async function clear(): Promise<void>{
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const contryRepo = AppDataSource.getRepository(Country);
        const cityRepo = AppDataSource.getRepository(City);
        const matchRepo = AppDataSource.getRepository(Match);
        const stadiumRepo = AppDataSource.getRepository(Stadium);
        const teamRepo = AppDataSource.getRepository(Team);
        const ticketRepo = AppDataSource.getRepository(Ticket);

        await matchRepo.deleteAll();
        await ticketRepo.deleteAll();
        await stadiumRepo.deleteAll();
        await cityRepo.deleteAll();
        await contryRepo.deleteAll();
        await teamRepo.deleteAll();
        await AppDataSource.destroy();
        console.log("Database cleared successfully");
    } catch (error) {
        console.error(error);
        console.error("Can't clear database");
    }
}

async function seed() : Promise<void>{
    try{
        await clear();
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const contryRepo = AppDataSource.getRepository(Country);
        const cityRepo = AppDataSource.getRepository(City);
        const matchRepo = AppDataSource.getRepository(Match);
        const stadiumRepo = AppDataSource.getRepository(Stadium);
        const teamRepo = AppDataSource.getRepository(Team);
        const ticketRepo = AppDataSource.getRepository(Ticket);

        for (const c of countries){
            await contryRepo.save(
                contryRepo.create({name: c.name, code: c.code})
            );
        }
        console.log("Countries seeded successfully");
        for (const c of city){
            await cityRepo.save(
                cityRepo.create({name: c.name, country: c.country})
            );
        }
        console.log("Cities seeded successfully");
        for (const t of teams){
            await teamRepo.save(
                teamRepo.create({name: t.name, code: t.code})
            );
        }
        console.log("Teams seeded successfully");
        for (const s of stadiums){
            await stadiumRepo.save(
                stadiumRepo.create({name: s.name, city: s.city, capacity: s.capacity})
            );
        }
        console.log("Stadiums seeded successfully");
        for (const m of match){
            await matchRepo.save(
                matchRepo.create({id: m.id, homeTeam: m.homeTeam, awayTeam: m.awayTeam, homeScore: m.homeScore, 
                    awayScore: m.awayScore, homeScoreExtraTime: m.homeScoreExtraTime, awayScoreExtraTime: m.awayScoreExtraTime, homeScoreShootOut: m.homeScoreShootOut, 
                    awayScoreShootOut: m.awayScoreShootOut, stadium: m.stadium, status: m.status, stage: m.stage, date: m.date})
            );
        }
        console.log("Matches seeded successfully");
        for (const t of tickets){
            await ticketRepo.save(
                ticketRepo.create({id: t.id, match: t.match, seat: t.seat, firstname: t.firstname, lastname: t.lastname, email: t.email})
            );
        }
        await AppDataSource.destroy();
        console.log("Database seeding completed successfully");
    } catch (error) {
        console.error(error);
        console.error("Can't seed database");
    }
}

seed();