import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
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
        typeNotification: ['NePasNotifier'],
        courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          confirmerCourriel: [{value: '', disabled: true}],
        }),
        telephone: [{value: '', disabled: true}]
        
    });

    this.typeProbleme.obtenirTypesProblemes()
    .subscribe(prob => this.typesproblemesProblemes = prob,
               error => this.errorMessage = <any>error)
  };

  appliquerNotifications(typeNotification: string): void {

    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const confirmerCourrielControl = this.problemeForm.get('courrielGroup.confirmerCourriel');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');
    const pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+";
    const patt = "[0-9]+";

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    confirmerCourrielControl.clearValidators();
    confirmerCourrielControl.reset();
    confirmerCourrielControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    courrielControl.updateValueAndValidity();
    confirmerCourrielControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();

    if (typeNotification == 'NePasNotifier') {

      courrielControl.disable();
      confirmerCourrielControl.disable();
      telephoneControl.disable();

    } else if (typeNotification == 'courriel') {

      courrielControl.enable();
      courrielControl.setValidators([Validators.pattern(pattern), Validators.required]);

      confirmerCourrielControl.enable();
      confirmerCourrielControl.setValidators([Validators.required]);

      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);

    } else if (typeNotification == 'telephone') {

      telephoneControl.enable();
      telephoneControl.setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.pattern(patt), Validators.required]);
    }

    courrielControl.updateValueAndValidity();
    confirmerCourrielControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }
}

