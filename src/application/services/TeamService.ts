import { ILike, Repository } from "typeorm";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { MatchStage } from "@domain/entities/MatchStage";
import { FifaCode } from "@domain/value-object/FifaCode";
import { xid } from "zod";
import { ValidationError } from "@domain/errors/ValidationError";

export class TeamService {
    private readonly teamRepository: Repository<Team>;
    private readonly matchRepository: Repository<Match>;
    constructor(teamRepository: Repository<Team>, matchRepository: Repository<Match>) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    async findTeamByFifaCode(fifaCode: string) : Promise<Team> {
        try {
            new FifaCode(fifaCode);
        }
        catch (error) {
            throw new ValidationError(`Invalid FIFA code: "${fifaCode}"`);
        }
        const team = await this.teamRepository.findOne({
            where: {
                code: fifaCode
            }
        });
        if (!team) {
            throw new NotFoundError(`Team with FIFA code "${fifaCode}" does not exist`);
        }
        return team;
    }


    async findMatchsByTeamFifaCode(fifaCode: string) : Promise<Match[]> {
        try {
            new FifaCode(fifaCode);
        }
        catch (error) {
            throw new ValidationError(`Invalid FIFA code: "${fifaCode}"`);
        }
        const teamMatchs = await this.matchRepository.find({
            where: [
                { homeTeam: { code: fifaCode } },
                { awayTeam: { code: fifaCode } }
            ], relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: {
                    city: {
                        country : true
                    }
                }
            }
        });
        if (teamMatchs.length === 0) {
            throw new NotFoundError(`No matches found for team with FIFA code "${fifaCode}"`);
        }
        return teamMatchs;
    }

    async findMatchsByTeamAndStage(fifaCode: string, stageEnum: string) : Promise<Match[]> {
        if (!stageEnum || !(stageEnum in MatchStage)) {
            throw new ValidationError(`Invalid stage: "${stageEnum}"`);
        }
        if (!fifaCode) {
            throw new ValidationError('Missing fifaCode parameter');
        }
        try {
            new FifaCode(fifaCode);
        } catch (error) {
            throw new ValidationError(`Invalid FIFA code: "${fifaCode}"`);
        }
        const stage = MatchStage[stageEnum as keyof typeof MatchStage];
        const teamMatchs = await this.matchRepository.find({
            where: [
                { homeTeam: { code: fifaCode }, stage: stage },
                { awayTeam: { code: fifaCode }, stage: stage }
            ],
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: {
                    city: {
                        country : true
                    }
                }
            }
        });
        if (teamMatchs.length === 0) {
            throw new NotFoundError(`No matches found for team with FIFA code "${fifaCode}" at stage "${stageEnum}"`);
        }
        return teamMatchs;
    }

    async findMatchName(name : string): Promise<Team[]>{
        const teams = await this.teamRepository.find({
            where: {
                name: ILike(`%${name}%`)
            }
        });
        if (teams.length === 0) {
            throw new NotFoundError(`No teams found with name "${name}"`);
        }
        return teams;
    }

    async findAllTeams(sort : string): Promise<Team[]> {
        if (sort && sort !== "name" && sort !== "-name") {
            throw new ValidationError(`Invalid sort parameter: "${sort}". Valid values are "name" or "-name".`);
        }
        const teams = await this.teamRepository.find({
            order: { name: sort === "-name" ? "DESC" : "ASC" }
        });
        if (teams.length === 0) {
            throw new NotFoundError(`No teams found`);
        }
        return teams;
    }
}