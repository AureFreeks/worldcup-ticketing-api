import {Country} from "@domain/entities/Country";

import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class City {
    @PrimaryColumn()
    readonly name : string;
    @ManyToOne(() => Country)
    readonly country:Country;
    constructor(country?:Country,name?:string) {
        /*Record<string, string[]> signifie on prend un string clé, et un tableau de String en valeur
            ainsi, on s'assure que les ville corresponde bien au bon pays
        
        
        */
        if (country && name) {
            const paireValide: Record<string, string[]> = { 
                USA:["Atlanta", "Boston" , "Dallas", "Houston" , "Kansas City" , "Los Angeles" ,"Miami" , "New York" , "Philadelphia" , "Seattle" , "San Francisco"],
                Mexico:["Guadalajara", "Mexico City" , "Monterrey"],
                Canada:[ "Seattle" , "San Francisco"]};

                if (!paireValide[country.name].includes(name)) {
                    throw new Error("ville et pays ne corresponde pas");
            }
            this.country=country;
            this.name=name;
        }
    }
}


