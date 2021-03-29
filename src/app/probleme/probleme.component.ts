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
        nomProbleme: ['',[ZonesValidator.longueurMinimum(3), Validators.required]],
        noProbleme: ['',[Validators.maxLength(50), Validators.required]]

    });

    this.typeProbleme.obtenirTypesProblemes()
    .subscribe(prob => this.typesproblemesProblemes = prob,
               error => this.errorMessage = <any>error);

  }

}

