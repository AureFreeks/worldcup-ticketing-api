import { FifaCode } from "@domain/value-object/FifaCode";

import { Column, Entity, PrimaryColumn} from "typeorm"
@Entity()
export class Team {
    @PrimaryColumn()
    readonly name:String;
    @Column()
    readonly code:string;

    constructor(name?:String,code?:FifaCode) {
        if (code) {
            this.code=code.getValue();
        }
        if (name) {
            this.name=name;
        }
    }
}