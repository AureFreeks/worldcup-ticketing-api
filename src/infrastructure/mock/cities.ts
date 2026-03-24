import { City } from "../../domain/entities/City";
import { mexico,usa,canada } from "./Countries";

export const Guadalajara = {country:mexico, name:"Guadalajara"} as const;
export const Miami = {country: usa, name:"Miami"} as const;
export const Toronto  = {country: canada, name:"Toronto"} as const;


export const city : Array<City> = [Guadalajara, Miami, Toronto]