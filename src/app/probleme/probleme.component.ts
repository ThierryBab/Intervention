import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesproblemesProblemes: ITypeProbleme[];
  errorMessage: string;
  save (): void{}

  constructor(private fb: FormBuilder, private typeProbleme: TypeProblemeService ) { }

  

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenomProbleme: ['',[ZonesValidator.longueurMinimum(3), Validators.required]],
        nomProbleme: ['',[Validators.maxLength(50), Validators.required]],
        noProbleme: ['',[ Validators.required]],
        noTypeProbleme: ['', Validators.required],
        courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          confirmerCourriel: [{value: '', disabled: true}],
        }),
        telephone: [{value: '', disabled: true}]
    });

    this.typeProbleme.obtenirTypesProblemes()
    .subscribe(prob => this.typesproblemesProblemes = prob,
               error => this.errorMessage = <any>error);
  }

  //appliquerNotifications(typeNotifications: string): void {
    appliquerNotifications(): void {
      const telephoneControl = this.problemeForm.get('telephone');   
      const courrielControl = this.problemeForm.get('courrielGroup.courriel');   
      const confirmerCourrielControl = this.problemeForm.get('courrielGroup.confirmerCourriel');   
   
      // Tous remettre à zéro
      telephoneControl.clearValidators();
      telephoneControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
      telephoneControl.disable();
   
      courrielControl.clearValidators();
      courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
      courrielControl.disable();
   
      confirmerCourrielControl.clearValidators();
      confirmerCourrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
      confirmerCourrielControl.disable();
   
      telephoneControl.updateValueAndValidity();  
      courrielControl.updateValueAndValidity(); 
      confirmerCourrielControl.updateValueAndValidity(); 
    }
}

