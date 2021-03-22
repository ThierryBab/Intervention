import { AbstractControl } from "@angular/forms";
import { ZonesValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
    
    it('#7 | une chaîne avec 10 espaces est invalide', () =>{
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: ''.repeat(10) }
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('#8 | Une phrase avec des mots est valide', () =>{
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: 'ViveAngular' }
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () =>{
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: '   je le veux   ' }
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('#10 | Une phrase avec 1 espace et 2 caractères est invalide.', () =>{
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: ' xx' }
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide', () =>{
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: '  x' }
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () =>{
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: '   xxx' }
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide ', () =>{
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: '     xxxxx     ' }
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('#14 | Une chaîne nulle est invalide', () =>{
        let validator = ZonesValidator.longueurMinimum(3);
        let control = {value: null }
        let result = validator(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });
});