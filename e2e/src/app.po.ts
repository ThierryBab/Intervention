import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get("/probleme");
  }

  async getParagraphText() : Promise<string> {
    return element(by.css('app-root h5')).getText();
  }

  // Permet de vider toutes les zones.  A appeller dans chaque test.
  async viderToutesLesZones() : Promise<void> {
    await element(by.id('prenomProblemeId')).clear();  
    await element(by.id('nomProblemeId')).clear();
   // Sélectionner le premier élément dans la zone de liste déroulante (Sélectionner un type de problème (obligatoire))
    await element(by.id('noProblemeId')).all(by.tagName('option')).get(0).click();      
    // Cliquer sur le bouton radio par défaut (Pas de notification)
    await element.all(by.id('typeNotificationId')).get(0).click();
    //await element(by.id('courrielId')).clear();
    //await element(by.id('courrielConfirmationId')).clear();   
    //await element(by.id('telephoneId')).clear();       
    await element(by.id('noUniteId')).clear();
    await element(by.id('descriptionProblemeId')).clear();     
   }
 
   // Inscrire tous les renseignements obligatoires pour le scénario de base HAPPY PATH (saisie minimum obligatoire pour rendre le formulaire valide)
  async setChampsValidesScenarioNominal() : Promise<void> {
    await element(by.id('prenomProblemeId')).sendKeys('Thierry');
    await element(by.id('nomProblemeId')).sendKeys('Babault');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('typeNotificationId')).get(0).click();  
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }
 
  // Inscrire tous les renseignements obligatoires pour le scénario alternatif Par message TEXTE
  async setChampsValidesScenarioAlternatifParMessageTexte() : Promise<void> {
    await element(by.id('prenomProblemeId')).sendKeys('Thierry');
    await element(by.id('nomProblemeId')).sendKeys('Babault');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noProblemeId')).all(by.tagName('option')).get(3).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('typeNotificationId')).get(2).click();  
    await element(by.id('telephoneId')).sendKeys('4384036861');
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }
 
  // Inscrire tous les renseignements obligatoires pour le scénario alternatif Par courriel
  async setChampsValidesScenarioAlternatifParCourriel() : Promise<void> {
    await element(by.id('prenomProblemeId')).sendKeys('thierry');
    await element(by.id('nomProblemeId')).sendKeys('babault');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noProblemeId')).all(by.tagName('option')).get(4).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('typeNotificationId')).get(1).click();  
    await element(by.id('courrielId')).sendKeys('aaa@ddd.com');
    await element(by.id('courrielConfirmationId')).sendKeys('aaa@ddd.com');
    await element(by.id('descriptionProblemeId')).sendKeys('Problème d\'installation du système d\'exploitation...');
  }
 
  async setZoneDescriptionProblemeCaracteresSuffisants() : Promise<void> {
    await element(by.id('descriptionProblemeId')).clear();
    await element(by.id('descriptionProblemeId')).sendKeys('AAAAAAAAAA');
  }
 
  async setZoneDescriptionProblemeCaracteresInsuffisants() : Promise<void> {
    await element(by.id('descriptionProblemeId')).clear();
    await element(by.id('descriptionProblemeId')).sendKeys('A');
  }

  // Permet d'obtenir toutes les propriétés et leurs valeurs du bouton Sauvegarder
  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  } 
 
  obtenirClasseZoneDescriptionProbleme(){
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  }
}
  
