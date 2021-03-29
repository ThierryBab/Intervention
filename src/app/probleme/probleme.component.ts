import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  save (): void{}

  constructor(private fb: FormBuilder) { }

  

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenomProbleme: ['',[ZonesValidator.longueurMinimum(3), Validators.required]]
    });

  }

}

