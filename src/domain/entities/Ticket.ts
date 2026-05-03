import {Match} from "@domain/entities/Match"

import { Column, Entity, ManyToOne, PrimaryColumn} from "typeorm"
@Entity()
export class Ticket {
   @PrimaryColumn()
   readonly id:number;
   @ManyToOne(() => Match)
   readonly match: Match;
   @Column()
   readonly seat :string;
   @Column()
   readonly firstname : string;
   @Column()
   readonly lastname : string;
   @Column()
   readonly email : string

   constructor(id?:number, match?: Match, seat?:string, firstname?: string, lastname?: string, email?: string) {
      if (id && match && seat && firstname && lastname && email) {
         if (id<0)  {throw Error("Erreur id négatif") }
         if (seat==null) {throw Error("Erreur la place est vide")}
         if (firstname==null) {throw Error("Erreur le prénom est vide")}
         if (lastname==null) {throw Error("Erreur le nom est vide")}
         if (email==null) {throw Error("Erreur l'email est vide")}
         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { throw Error("Erreur email invalide") }
         this.id=id;
         this.match=match;
         this.seat=seat;
         this.firstname=firstname;
         this.lastname=lastname;
         this.email=email;
      }
   }
}
