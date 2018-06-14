import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProfessionalUserAccountAssignment e2e test', () => {

    let navBarPage: NavBarPage;
    let professionalUserAccountAssignmentDialogPage: ProfessionalUserAccountAssignmentDialogPage;
    let professionalUserAccountAssignmentComponentsPage: ProfessionalUserAccountAssignmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProfessionalUserAccountAssignments', () => {
        navBarPage.goToEntity('professional-user-account-assignment-reference-data');
        professionalUserAccountAssignmentComponentsPage = new ProfessionalUserAccountAssignmentComponentsPage();
        expect(professionalUserAccountAssignmentComponentsPage.getTitle())
            .toMatch(/Professional User Account Assignments/);

    });

    it('should load create ProfessionalUserAccountAssignment dialog', () => {
        professionalUserAccountAssignmentComponentsPage.clickOnCreateButton();
        professionalUserAccountAssignmentDialogPage = new ProfessionalUserAccountAssignmentDialogPage();
        expect(professionalUserAccountAssignmentDialogPage.getModalTitle())
            .toMatch(/Create or edit a Professional User Account Assignment/);
        professionalUserAccountAssignmentDialogPage.close();
    });

    it('should create and save ProfessionalUserAccountAssignments', () => {
        professionalUserAccountAssignmentComponentsPage.clickOnCreateButton();
        professionalUserAccountAssignmentDialogPage.paymentAccountSelectLastOption();
        professionalUserAccountAssignmentDialogPage.professionalUserSelectLastOption();
        professionalUserAccountAssignmentDialogPage.save();
        expect(professionalUserAccountAssignmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProfessionalUserAccountAssignmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-professional-user-account-assignment-reference-data div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProfessionalUserAccountAssignmentDialogPage {
    modalTitle = element(by.css('h4#myProfessionalUserAccountAssignmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    paymentAccountSelect = element(by.css('select#field_paymentAccount'));
    professionalUserSelect = element(by.css('select#field_professionalUser'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    paymentAccountSelectLastOption = function() {
        this.paymentAccountSelect.all(by.tagName('option')).last().click();
    };

    paymentAccountSelectOption = function(option) {
        this.paymentAccountSelect.sendKeys(option);
    };

    getPaymentAccountSelect = function() {
        return this.paymentAccountSelect;
    };

    getPaymentAccountSelectedOption = function() {
        return this.paymentAccountSelect.element(by.css('option:checked')).getText();
    };

    professionalUserSelectLastOption = function() {
        this.professionalUserSelect.all(by.tagName('option')).last().click();
    };

    professionalUserSelectOption = function(option) {
        this.professionalUserSelect.sendKeys(option);
    };

    getProfessionalUserSelect = function() {
        return this.professionalUserSelect;
    };

    getProfessionalUserSelectedOption = function() {
        return this.professionalUserSelect.element(by.css('option:checked')).getText();
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
