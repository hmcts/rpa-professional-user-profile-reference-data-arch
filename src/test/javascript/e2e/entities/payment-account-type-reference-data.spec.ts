import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PaymentAccountType e2e test', () => {

    let navBarPage: NavBarPage;
    let paymentAccountTypeDialogPage: PaymentAccountTypeDialogPage;
    let paymentAccountTypeComponentsPage: PaymentAccountTypeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PaymentAccountTypes', () => {
        navBarPage.goToEntity('payment-account-type-reference-data');
        paymentAccountTypeComponentsPage = new PaymentAccountTypeComponentsPage();
        expect(paymentAccountTypeComponentsPage.getTitle())
            .toMatch(/Payment Account Types/);

    });

    it('should load create PaymentAccountType dialog', () => {
        paymentAccountTypeComponentsPage.clickOnCreateButton();
        paymentAccountTypeDialogPage = new PaymentAccountTypeDialogPage();
        expect(paymentAccountTypeDialogPage.getModalTitle())
            .toMatch(/Create or edit a Payment Account Type/);
        paymentAccountTypeDialogPage.close();
    });

    it('should create and save PaymentAccountTypes', () => {
        paymentAccountTypeComponentsPage.clickOnCreateButton();
        paymentAccountTypeDialogPage.setNameInput('name');
        expect(paymentAccountTypeDialogPage.getNameInput()).toMatch('name');
        paymentAccountTypeDialogPage.save();
        expect(paymentAccountTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PaymentAccountTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-payment-account-type-reference-data div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PaymentAccountTypeDialogPage {
    modalTitle = element(by.css('h4#myPaymentAccountTypeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
