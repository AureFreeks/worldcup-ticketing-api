import { Team } from "@domain/entities/Team"
import { Stadium } from "@domain/entities/Stadium";
import {MatchStatus} from "@domain/entities/MatchStatus";
import {MatchStage} from "@domain/entities/MatchStage";

export class Match {
    readonly id:number;
    readonly homeTeam:Team;
    readonly awayTeam:Team;
    readonly homeScore:number=0
    readonly awayScore:number=0
    homeScoreExtraTime: number | null = null;
    awayScoreExtraTime: number | null = null;
    homeScoreShootOut: number | null = null;
    awayScoreShootOut: number | null = null;
    stadium: Stadium;
    status: MatchStatus;
    stage: MatchStage;
    date: Date;

   isDraw() : boolean {
    return this.homeScore==this.awayScore;
   } 

   winner() : Team | null{
    if (this.isDraw()) 
        return null;

    else if (this.homeScore>this.awayScore) 
        return this.homeTeam;

    else 
        return this.awayTeam


   }

   constructor (id:number,homeTeam:Team,awayTeam:Team,HomeScore:number, AwayScore:number,stadium: Stadium,status: MatchStatus, stage: MatchStage,
    date: Date) {
    this.id=id;
    this.homeTeam=homeTeam;
    this.awayTeam=awayTeam;
    this.homeScore=HomeScore;
    this.awayScore=AwayScore;
    this.stadium=stadium;
    this.status=status;
    this.stage=stage;
    this.date=date;

     if (id<=0) {throw Error("id negatif")}
     if (homeTeam.name==awayTeam.name) {throw Error("nom de team identique")}
     if (HomeScore<0) {throw Error("score home negatif")}
     if (AwayScore<0) {throw Error("score visiteur negatif")}
   }




}