import { ILike, Repository } from "typeorm";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";


import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
export class CityService {
    private readonly cityRepository: Repository<City>;
    private readonly matchRepository: Repository<Match>;
    constructor(cityRepository: Repository<City>, matchRepository: Repository<Match>) {
        this.cityRepository = cityRepository;
        this.matchRepository = matchRepository;
    }
    async findCityByName(name: string) : Promise<City>{
        const city = await this.cityRepository.findOne({
            where: {
                name: ILike(`%${name}%`)
            },relations: {
                country: true
            }
        });
        if (!city) throw new NotFoundError(`City "${name}" does not exist`);
        return city;
    }
    async findAllCities(sort: string) : Promise<City[]> {
        if (sort && sort !== "name" && sort !== "-name") {
            throw new ValidationError(`Invalid sort value: ${sort}`);
        }
        const cities = await this.cityRepository.find({
            order: {
                name: sort === "name" ? "ASC" : "DESC"
            },relations: {
                country: true
            }
        });
        return cities;
    }
    async findMatchByCityName(name: string) : Promise<Match[]> {
        const cityMatchs = await this.matchRepository.find({
            where: {
                stadium: {
                    city: {
                        name: ILike(`%${name}%`)
                    }
                }
            },relations: {
                    stadium: {
                        city: true
                    },
                    homeTeam: true,
                    awayTeam: true
            }
        });
        if (cityMatchs.length === 0) return cityMatchs;
        return cityMatchs;
    }  
}