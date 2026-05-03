import { ILike, Repository } from "typeorm";
import { Match } from "@domain/entities/Match";
import { statusEnum } from "@domain/enums/MatchStatus";
import { MatchStatus } from "@domain/entities/MatchStatus";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { MatchStage } from "@domain/entities/MatchStage";
import { ValidationError } from "@domain/errors/ValidationError";
export class MatchService {
    private readonly matchRepository: Repository<Match>;
    constructor(matchRepository: Repository<Match>) {
        this.matchRepository = matchRepository;
    }

    async findMatchByStatus(statusEnum: string) : Promise<Match[]> {
        if (!statusEnum || MatchStatus[statusEnum as keyof typeof MatchStatus] === undefined) {
            throw new ValidationError(`Invalid status: "${statusEnum}"`);
        }
        const status = MatchStatus[statusEnum as keyof typeof MatchStatus];
        const statusMatchs = await this.matchRepository.find({
            where: {
                status: status
            },relations : {
                homeTeam : true,
                awayTeam : true,
                stadium : true
            }
        });
        if (statusMatchs.length === 0){
            throw new NotFoundError(`No matches found with status: ${statusEnum}`);
        }
        return statusMatchs;
    }
    async findMatchByStage(stageEnum: string) : Promise<Match[]> {
        if (!stageEnum || MatchStage[stageEnum as keyof typeof MatchStage] === undefined) {
                    throw new ValidationError(`Invalid stage: "${stageEnum}"`);
        }
        const stage = MatchStage[stageEnum as keyof typeof MatchStage];
        const statusMatchs = await this.matchRepository.find({
            where: {
                stage: stage
            },relations : {
                homeTeam : true,
                awayTeam : true,
                stadium : true
            }
        });
        if (statusMatchs.length === 0){
            throw new NotFoundError(`No matches found with stage: ${stageEnum}`);
        }
        return statusMatchs;
    }
    async findMatchById(id: number) : Promise<Match> {
        if (id < 0) {
            throw new ValidationError(`ID parameter must be a positive integer`);
        }
        const match = await this.matchRepository.findOne({
            where: {
                id: id
            }
        });
        if (!match) {
            throw new NotFoundError(`Match ${id} does not exist`);
        }
        return match;
    }

    async findMatchContainingTeamCountry(teamCountry: string) : Promise<Match[]> {
        const matchs = await this.matchRepository.find({
            where: [
                    { homeTeam: { code: ILike(teamCountry) } },
                    { awayTeam: { code: ILike(teamCountry) } }
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
        if (matchs.length === 0) {
            throw new NotFoundError(`No matches found with team country: ${teamCountry}`);
        }
        return matchs;
    }

    async findMatchByDate(date: string) : Promise<Match[]> {
        try {
            new Date(date);
        }
        catch (error) {
            throw new ValidationError(`Invalid date format. Expected format: YYYY-MM-DD`);
        }
        const matchFiltre = await this.matchRepository.find({
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
        if (matchFiltre.length === 0) {
            throw new NotFoundError(`No matches found with date: ${date}`);
        }
        return matchFiltre;
    }

    async findAllMatchs() : Promise<Match[]> {
        const matchs = await this.matchRepository.find({ relations: {
                homeTeam: true, 
                awayTeam: true,
                stadium: {
                    city: {
                        country: true
                    }
                }
            }
        });
        if (matchs.length === 0) {
            throw new NotFoundError(`No matches found`);
        }
        return matchs;
    }
}