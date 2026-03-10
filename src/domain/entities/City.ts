import {Country} from "./Country";
export class City {
    
    constructor(public readonly country:Country,public readonly name:"Atlanta" | "Boston" | "Dallas" | "Houston" | "Kansas City" | "Los Angeles" | "Miami" | "New York" | "Philadelphia" | "Seattle" | "San Francisco" | "Guadalajara" | "Mexico City" | "Monterrey" | "Toronto" | "Vancouver" ) {
        /*Record<string, string[]> signifie on prend un string clé, et un tableau de String en valeur
            ainsi, on s'assure que les ville corresponde bien au bon pays
        
        
        */

        const paireValide: Record<string, string[]> = { 
            USA:["Atlanta", "Boston" , "Dallas", "Houston" , "Kansas City" , "Los Angeles" ,"Miami" , "New York" , "Philadelphia" , "Seattle" , "San Francisco"],
            Mexico:["Guadalajara", "Mexico City" , "Monterrey"],
            Canada:[ "Seattle" , "San Francisco"]};

             if (!paireValide[country.name].includes(name)) {
      throw new Error("ville et pays ne corresponde pas");
         }
            
       



     }

   
}
 

