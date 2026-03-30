import { Stadium } from "domain/entities/Stadium";
import {Miami, Toronto, Guadalajara } from "./cities";

export const BMO = {name:"BMO Field",city:Toronto,capacity:45000}
export const SoFi={name:"SoFi Stadium",city:Miami,capacity:70000}
export const Estadio={name:"Estadio Akron",city:Guadalajara, capacity:44330}

export const stadiums : Array<Stadium> = [BMO, SoFi, Estadio]