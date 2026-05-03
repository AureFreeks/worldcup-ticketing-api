import { Entity, PrimaryColumn} from "typeorm"

@Entity()
export class Country {
    @PrimaryColumn()
    readonly name : string;
    @PrimaryColumn()
    readonly code : string;
    constructor(name?: "USA" | "Mexico" | "Canada",code?:"us" |"me"|"ca") {
        if (name && code) {
            if (!((name=="USA"&&code=="us")||(name=="Mexico"&&code=="me")||(name=="Canada"&&code=="ca"))) {
                throw Error("nom et code ne match pas")
            }
            this.name=name;
            this.code=code;
        }
    }
}
