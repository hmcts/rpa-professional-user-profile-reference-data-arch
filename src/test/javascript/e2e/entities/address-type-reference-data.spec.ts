import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AddressType e2e test', () => {

    let navBarPage: NavBarPage;
    let addressTypeDialogPage: AddressTypeDialogPage;
    let addressTypeComponentsPage: AddressTypeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AddressTypes', () => {
        navBarPage.goToEntity('address-type-reference-data');
        addressTypeComponentsPage = new AddressTypeComponentsPage();
        expect(addressTypeComponentsPage.getTitle())
            .toMatch(/Address Types/);

    });

    it('should load create AddressType dialog', () => {
        addressTypeComponentsPage.clickOnCreateButton();
        addressTypeDialogPage = new AddressTypeDialogPage();
        expect(addressTypeDialogPage.getModalTitle())
            .toMatch(/Create or edit a Address Type/);
        addressTypeDialogPage.close();
    });

    it('should create and save AddressTypes', () => {
        addressTypeComponentsPage.clickOnCreateButton();
        addressTypeDialogPage.setNameInput('name');
        expect(addressTypeDialogPage.getNameInput()).toMatch('name');
        addressTypeDialogPage.save();
        expect(addressTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address-type-reference-data div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AddressTypeDialogPage {
    modalTitle = element(by.css('h4#myAddressTypeLabel'));
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
