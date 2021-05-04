import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static MinLength(arg0: number): any {
      throw new Error('Method not implemented.');
    }
    static longueurMinimum(longueur: Number): ValidatorFn {
        return(valeurControle: AbstractControl): {[key: string]: boolean} | null =>{
            if(valeurControle.value == null) {

                return {'nbreCaracteresInsuffisants': true};
            }
            if (valeurControle.value.trim().length >= longueur ) {
                return null;
            }
        return {'nbreCaracteresInsuffisants': true};
        };
    }
}