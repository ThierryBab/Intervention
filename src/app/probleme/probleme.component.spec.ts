import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from './probleme.component';
import { TypeProblemeService } from './type-probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeProblemeService]
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
  
  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications("NePasNotifier");
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
 
  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications("NePasNotifier");
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });
 
 
  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications("NePasNotifier");
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
 
  
  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications("NePasNotifier");
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTruthy();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBeTruthy();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID');
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    expect(zone.status).toEqual('INVALID');
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('abv');
    expect(zone.status).toEqual('INVALID');
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne nulll', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('thierry.babault.20@hotmail.fr');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.status).toEqual('INVALID');
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('thierry.babault.20@hotmail.fr');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.status).toEqual('INVALID');
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('thierry.babault.20@hotmail.fr');
    zone1.setValue('thierry.babault.20@hotmail.com');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.status).toEqual('INVALID');
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('thierry.babault.20@hotmail.fr');
    zone1.setValue('thierry.babault.20@hotmail.fr');
    let groupe = component.problemeForm.get('courrielGroup');
    expect(groupe.status).toEqual('VALID');
  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    expect(zone.enabled).toBeTruthy();
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('INVALID');
  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('abgakdgwoa');
    expect(zone.status).toEqual('INVALID');
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('123456789')
    expect(zone.status).toEqual('INVALID');
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('12345678987')
    expect(zone.status).toEqual('INVALID');
  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('0123456789')
    expect(zone.status).toEqual('VALID');
  });
});
