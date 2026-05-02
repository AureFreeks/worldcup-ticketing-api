import {Match} from "@domain/entities/Match"
import {Customer} from "@domain/entities/Customer"

export class Ticket {

   constructor(public readonly id:number, public readonly match : Match, public readonly seat :string, public readonly customer : Customer ) {
    if (id<0)  {throw Error("Erreur id négatif") }

    if (seat==null) {throw Error("Erreur la place est vide")}



   }
}