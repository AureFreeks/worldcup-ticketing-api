import { Repository } from "typeorm";
import { Match } from "@domain/entities/Match";
export class MatchService {
    private readonly matchRepository: Repository<Match>;
    constructor(matchRepository: Repository<Match>) {
        this.matchRepository = matchRepository;
    }

}