export class Country {
     constructor(public readonly name: "USA" | "Mexico" | "Canada",public readonly code:"us" |"me"|"ca") {
        if (!((name=="USA"&&code=="us")||(name=="Mexico"&&code=="me")||(name=="Canada"&&code=="ca"))) {
            throw Error("nom et code ne match pas")
        }
            
     }
    
 
}
