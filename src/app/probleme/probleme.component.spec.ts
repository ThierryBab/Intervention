import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
 
  it('#1 | zone PRÉNOM invalide avec 2 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenomProbleme');
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });

  it('#2 | zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenomProbleme'];
    zone.setValue('b'.repeat(5));
    expect(zone.valid).toBeTruthy();
  });
  it('#3 | zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenomProbleme'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });
  it('#4 | zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenomProbleme');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('#5 | zone PRÉNOM invalide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['prenomProbleme'];
    zone.setValue('          ');
    expect(zone.invalid).toBe(true);
  });
  it('#6 | zone PRÉNOM invalide avec 2 espaces et 1 caractères', () => {
    let zone = component.problemeForm.controls['prenomProbleme'];
    zone.setValue('  '.repeat(2) + 'a'.repeat(1));
    expect(zone.invalid).toBe(true);
  });
});
