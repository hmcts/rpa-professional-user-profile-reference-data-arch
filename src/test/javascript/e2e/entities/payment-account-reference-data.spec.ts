import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PaymentAccount e2e test', () => {

    let navBarPage: NavBarPage;
    let paymentAccountDialogPage: PaymentAccountDialogPage;
    let paymentAccountComponentsPage: PaymentAccountComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PaymentAccounts', () => {
        navBarPage.goToEntity('payment-account-reference-data');
        paymentAccountComponentsPage = new PaymentAccountComponentsPage();
        expect(paymentAccountComponentsPage.getTitle())
            .toMatch(/Payment Accounts/);

    });

    it('should load create PaymentAccount dialog', () => {
        paymentAccountComponentsPage.clickOnCreateButton();
        paymentAccountDialogPage = new PaymentAccountDialogPage();
        expect(paymentAccountDialogPage.getModalTitle())
            .toMatch(/Create or edit a Payment Account/);
        paymentAccountDialogPage.close();
    });

    it('should create and save PaymentAccounts', () => {
        paymentAccountComponentsPage.clickOnCreateButton();
        paymentAccountDialogPage.setPbaNumberInput('pbaNumber');
        expect(paymentAccountDialogPage.getPbaNumberInput()).toMatch('pbaNumber');
        paymentAccountDialogPage.organisationSelectLastOption();
        paymentAccountDialogPage.paymentAccountTypeSelectLastOption();
        paymentAccountDialogPage.save();
        expect(paymentAccountDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PaymentAccountComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-payment-account-reference-data div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PaymentAccountDialogPage {
    modalTitle = element(by.css('h4#myPaymentAccountLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    pbaNumberInput = element(by.css('input#field_pbaNumber'));
    organisationSelect = element(by.css('select#field_organisation'));
    paymentAccountTypeSelect = element(by.css('select#field_paymentAccountType'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setPbaNumberInput = function(pbaNumber) {
        this.pbaNumberInput.sendKeys(pbaNumber);
    };

    getPbaNumberInput = function() {
        return this.pbaNumberInput.getAttribute('value');
    };

    organisationSelectLastOption = function() {
        this.organisationSelect.all(by.tagName('option')).last().click();
    };

    organisationSelectOption = function(option) {
        this.organisationSelect.sendKeys(option);
    };

    getOrganisationSelect = function() {
        return this.organisationSelect;
    };

    getOrganisationSelectedOption = function() {
        return this.organisationSelect.element(by.css('option:checked')).getText();
    };

    paymentAccountTypeSelectLastOption = function() {
        this.paymentAccountTypeSelect.all(by.tagName('option')).last().click();
    };

    paymentAccountTypeSelectOption = function(option) {
        this.paymentAccountTypeSelect.sendKeys(option);
    };

    getPaymentAccountTypeSelect = function() {
        return this.paymentAccountTypeSelect;
    };

    getPaymentAccountTypeSelectedOption = function() {
        return this.paymentAccountTypeSelect.element(by.css('option:checked')).getText();
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
