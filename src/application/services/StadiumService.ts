import { ILike, Repository } from "typeorm";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";

export class StadiumService {
    private readonly stadiumRepository: Repository<Stadium>;
    private readonly matchRepository: Repository<Match>;
    constructor(stadiumRepository: Repository<Stadium>, matchRepository: Repository<Match>) {
        this.stadiumRepository = stadiumRepository;
        this.matchRepository = matchRepository;
    }

    async findStadiumByName(name: string) : Promise<Stadium> {
        if (!name) {
            throw new ValidationError(`Name parameter is required`);
        }
        const stadium = await this.stadiumRepository.findOne({
            where: {
                name: name
            },relations: {
                city: {
                    country : true
                }
            }
        });
        if (!stadium) throw new NotFoundError(`Stadium "${name}" does not exist`);
        return stadium;
    }

    async findMatchsByStadiumName(name: string) : Promise<Match[]> {

        if (!name) {
            throw new ValidationError(`Name parameter is required`);
        }
        const stadiumMatchs = await this.matchRepository.find({
            where: {
                stadium: {
                    name: ILike(name)
                }            },
            relations: 
            {
                homeTeam: true,
                awayTeam: true,
                stadium: {
                    city: {
                        country : true
                    }
                }
            }
        });
        if (stadiumMatchs.length === 0) throw new NotFoundError(`No matches found for stadium "${name}"`);
        return stadiumMatchs;
    }

    async findStadiumsByCityName(cityName: string) : Promise<Stadium[]> {
        const stadiums = await this.stadiumRepository.find({
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
        if (stadiums.length === 0) throw new NotFoundError(`No stadiums found for city "${cityName}"`);
        return stadiums;
    }

    async findStadiumsByCountryName(countryName: string) : Promise<Stadium[]> {
        const stadiums = await this.stadiumRepository.find({
            where : {
                    city : {
                        country : {
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
        if (stadiums.length === 0) throw new NotFoundError(`No stadiums found for country "${countryName}"`);
        return stadiums;
    }

    async findAllStadiums() : Promise<Stadium[]> {
        const stadiums = await this.stadiumRepository.find({ relations : {
            city: {
                country : true
            }
        }});
        if (stadiums.length === 0) throw new NotFoundError(`No stadiums found`);
        return stadiums;
    }
}