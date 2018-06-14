import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProfessionalUser e2e test', () => {

    let navBarPage: NavBarPage;
    let professionalUserDialogPage: ProfessionalUserDialogPage;
    let professionalUserComponentsPage: ProfessionalUserComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProfessionalUsers', () => {
        navBarPage.goToEntity('professional-user-reference-data');
        professionalUserComponentsPage = new ProfessionalUserComponentsPage();
        expect(professionalUserComponentsPage.getTitle())
            .toMatch(/Professional Users/);

    });

    it('should load create ProfessionalUser dialog', () => {
        professionalUserComponentsPage.clickOnCreateButton();
        professionalUserDialogPage = new ProfessionalUserDialogPage();
        expect(professionalUserDialogPage.getModalTitle())
            .toMatch(/Create or edit a Professional User/);
        professionalUserDialogPage.close();
    });

    it('should create and save ProfessionalUsers', () => {
        professionalUserComponentsPage.clickOnCreateButton();
        professionalUserDialogPage.setUserIdInput('userId');
        expect(professionalUserDialogPage.getUserIdInput()).toMatch('userId');
        professionalUserDialogPage.setFirstNameInput('firstName');
        expect(professionalUserDialogPage.getFirstNameInput()).toMatch('firstName');
        professionalUserDialogPage.setSurnameInput('surname');
        expect(professionalUserDialogPage.getSurnameInput()).toMatch('surname');
        professionalUserDialogPage.setEmailInput('email');
        expect(professionalUserDialogPage.getEmailInput()).toMatch('email');
        professionalUserDialogPage.setPhoneNumberInput('phoneNumber');
        expect(professionalUserDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        professionalUserDialogPage.save();
        expect(professionalUserDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProfessionalUserComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-professional-user-reference-data div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProfessionalUserDialogPage {
    modalTitle = element(by.css('h4#myProfessionalUserLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userIdInput = element(by.css('input#field_userId'));
    firstNameInput = element(by.css('input#field_firstName'));
    surnameInput = element(by.css('input#field_surname'));
    emailInput = element(by.css('input#field_email'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setUserIdInput = function(userId) {
        this.userIdInput.sendKeys(userId);
    };

    getUserIdInput = function() {
        return this.userIdInput.getAttribute('value');
    };

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    };

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    };

    setSurnameInput = function(surname) {
        this.surnameInput.sendKeys(surname);
    };

    getSurnameInput = function() {
        return this.surnameInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    };

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
