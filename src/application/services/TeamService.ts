import { Repository } from "typeorm";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";

export class TeamService {
    private readonly teamRepository: Repository<Team>;
    private readonly matchRepository: Repository<Match>;
    constructor(teamRepository: Repository<Team>, matchRepository: Repository<Match>) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

}