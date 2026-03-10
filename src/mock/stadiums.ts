import {Stadium} from '../domain/entities/Stadium';
import {Guadalajara, Toronto  ,Miami } from './cities';

export const Estadio_Akron   = {name :"Estadio Akron", city:Guadalajara, capacity:44330} as const;
export const BMO_Field = {name :"BMO Field", city:Toronto, capacity: 45000} as const;
export const Hard_Rock_Stadium = {name :"Hard Rock Stadium", city:Miami, capacity: 65000} as const;

export const stadiums : Array<Stadium> = [Estadio_Akron, BMO_Field, Hard_Rock_Stadium];

