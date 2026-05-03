import { FifaCode } from "@domain/value-object/FifaCode";

import { Column, Entity, PrimaryColumn} from "typeorm"
@Entity()
export class Team {
    @PrimaryColumn()
    readonly name:String;
    @Column()
    readonly code:string;

    constructor(name?:String,code?:FifaCode) {
        if (name && code) {
            this.name=name;
            this.code=code.getValue();
        }
    }
    toJSON() {
        return {
            name: this.name,
            code: { value: this.code } 
        };
    }
}