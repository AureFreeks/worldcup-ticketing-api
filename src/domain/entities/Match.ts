import { Team } from "@domain/entities/Team"
import { Stadium } from "@domain/entities/Stadium";
import {MatchStatus} from "@domain/entities/MatchStatus";
import {MatchStage} from "@domain/entities/MatchStage";


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    readonly id:number;
    
    @Column({ default: 0 })
    readonly homeScore:number=0
    
    @Column({ default: 0 })
    readonly awayScore:number=0
    
    @Column({ nullable: true })
    readonly homeScoreExtraTime: number | null = null;
    
    @Column({ nullable: true })
    readonly awayScoreExtraTime: number | null = null;
    
    
    @Column({ nullable: true })
    readonly homeScoreShootOut: number | null = null;
    
    @Column({ nullable: true })
    readonly awayScoreShootOut: number | null = null;
    
    @Column()
    readonly date: Date;


    //Enum 

    @Column({
        type: "enum",
        enum: MatchStatus
    })
    readonly status: MatchStatus;
    
    @Column({
        type: "enum",
        enum: MatchStage
    })
    readonly stage: MatchStage;

    //Clée étrangère
    @ManyToOne(() => Team)
    readonly homeTeam:Team;
    
    @ManyToOne(() => Team)
    readonly awayTeam:Team;
    
    @ManyToOne(() => Stadium)
    readonly stadium: Stadium;

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

   constructor (id?:number,homeTeam?:Team,awayTeam?:Team,HomeScore?:number, AwayScore?:number, homeScoreExtraTime?: number | null, awayScoreExtraTime?: number | null, homeScoreShootOut?: number | null, awayScoreShootOut?: number | null, stadium?: Stadium,status?: MatchStatus, stage?: MatchStage,
    date?: Date) {
        if (id !== undefined &&
            homeTeam !== undefined &&
            awayTeam !== undefined &&
            HomeScore !== undefined &&
            AwayScore !== undefined &&
            stadium !== undefined &&
            status !== undefined &&
            stage !== undefined &&
            date !== undefined &&
            homeScoreExtraTime !== undefined &&  
            awayScoreExtraTime !== undefined &&  
            homeScoreShootOut !== undefined &&   
            awayScoreShootOut !== undefined      
            ) 
        {
            if (id<=0) {throw Error("id negatif")}
            if (homeTeam.name==awayTeam.name) {throw Error("nom de team identique")}
            if (HomeScore<0) {throw Error("score home negatif")}
            if (AwayScore<0) {throw Error("score visiteur negatif")}
            this.id=id;
            this.homeTeam=homeTeam;
            this.awayTeam=awayTeam;
            this.homeScore=HomeScore;
            this.awayScore=AwayScore;
            this.homeScoreExtraTime=homeScoreExtraTime;
            this.awayScoreExtraTime=awayScoreExtraTime;
            this.homeScoreShootOut=homeScoreShootOut;
            this.awayScoreShootOut=awayScoreShootOut;
            this.stadium=stadium;
            this.status=status;
            this.stage=stage;
            this.date=date;
        }
    }

}