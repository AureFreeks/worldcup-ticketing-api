import { Context } from "hono";
import {stadiums} from "@mock/stadiums";

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
import { Stadium } from "@domain/entities/Stadium";

export class GetStadiumsHandler {
    async handle(c: Context) {
        const cityName = c.req.query('city[name]') || "";
        const countryCode = c.req.query('country[code]') || "";
        const countryName = c.req.query('country[name]') || "";
        const name = c.req.query('name') || "";
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        if (name) {
            const filteredStadiums = await stadiumRepository.find({
                where : {
                    name : ILike(`%${name}%`)
                },
                relations : {
                    city: {
                        country : true
                    }
                }
            });
            //const filteredStadiums = stadiums.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
            return c.json({
                success: true,
                message: `Stadiums filtered by name: ${name}`,
                data: filteredStadiums
            }, 200);
        }
        if (cityName) {
            const filteredStadiums = await stadiumRepository.find({
                where : {
                    city : {
                        name : ILike(`%${cityName}%`)
                    }
                },
                relations : {
                    city: {
                        country : true
                    }
                }
            });
            //const filteredStadiums = stadiums.filter(s => s.city.name.toLowerCase().includes(cityName.toLowerCase()));
            return c.json({
                success: true,
                message: `Stadiums filtered by city[name]:`,
                cityName : cityName,
                data: filteredStadiums
            },200);
        }
        if (countryCode) {
            const filteredStadiums = await stadiumRepository.find({
                where : {
                    city : {
                        country :{ 
                            code : ILike(`%${countryCode}%`)
                        }
                    }
                },
                relations : {
                    city: {
                        country : true
                    }
                }
            });
            //const filteredStadiums = stadiums.filter(s => s.city.country.code.toLowerCase().includes(countryCode.toLowerCase()));
            return c.json({
                success: true,
                message: `Stadiums filtered by country[code]:`,
                data: filteredStadiums
            },200);
        }
        if (countryName) {
            const filteredStadiums = await stadiumRepository.find({
                where : {
                    city : {
                        country :{ 
                            name : ILike(`%${countryName}%`)
                        }
                    }
                },
                relations : {
                    city: {
                        country : true
                    }
                }
            });
            //const filteredStadiums = stadiums.filter(s => s.city.country.name.toLowerCase().includes(counstryName.toLowerCase()));
            return c.json({
                success: true,
                message: `Stadiums filtered by country[name]:`,
                data: filteredStadiums
            },200);
        }

        const allStadiums = await stadiumRepository.find(
            {relations : {
                city: {
                    country : true
                }
            }
        });
        return c.json({
            success: true,
            message : 'All stadiums',
            data : allStadiums
        }, 200);
    }
}

