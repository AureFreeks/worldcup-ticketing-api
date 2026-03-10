import { FifaCode } from "../value-object/FifaCode";

export class Team {
    
    name:String;
    code:FifaCode;

    constructor(name:String,code:FifaCode) {
        this.code=code;
        this.name=name;

    }
}