import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Address e2e test', () => {

    let navBarPage: NavBarPage;
    let addressDialogPage: AddressDialogPage;
    let addressComponentsPage: AddressComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address-reference-data');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle())
            .toMatch(/Addresses/);

    });

    it('should load create Address dialog', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage = new AddressDialogPage();
        expect(addressDialogPage.getModalTitle())
            .toMatch(/Create or edit a Address/);
        addressDialogPage.close();
    });

    it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage.setAddressLine1Input('addressLine1');
        expect(addressDialogPage.getAddressLine1Input()).toMatch('addressLine1');
        addressDialogPage.setAddressLine2Input('addressLine2');
        expect(addressDialogPage.getAddressLine2Input()).toMatch('addressLine2');
        addressDialogPage.setAddressLine3Input('addressLine3');
        expect(addressDialogPage.getAddressLine3Input()).toMatch('addressLine3');
        addressDialogPage.setCityInput('city');
        expect(addressDialogPage.getCityInput()).toMatch('city');
        addressDialogPage.setCountyInput('county');
        expect(addressDialogPage.getCountyInput()).toMatch('county');
        addressDialogPage.setCountryInput('country');
        expect(addressDialogPage.getCountryInput()).toMatch('country');
        addressDialogPage.setPostcodeInput('postcode');
        expect(addressDialogPage.getPostcodeInput()).toMatch('postcode');
        addressDialogPage.addressTypeSelectLastOption();
        addressDialogPage.organisationSelectLastOption();
        addressDialogPage.save();
        expect(addressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address-reference-data div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AddressDialogPage {
    modalTitle = element(by.css('h4#myAddressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    addressLine1Input = element(by.css('input#field_addressLine1'));
    addressLine2Input = element(by.css('input#field_addressLine2'));
    addressLine3Input = element(by.css('input#field_addressLine3'));
    cityInput = element(by.css('input#field_city'));
    countyInput = element(by.css('input#field_county'));
    countryInput = element(by.css('input#field_country'));
    postcodeInput = element(by.css('input#field_postcode'));
    addressTypeSelect = element(by.css('select#field_addressType'));
    organisationSelect = element(by.css('select#field_organisation'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setAddressLine1Input = function(addressLine1) {
        this.addressLine1Input.sendKeys(addressLine1);
    };

    getAddressLine1Input = function() {
        return this.addressLine1Input.getAttribute('value');
    };

    setAddressLine2Input = function(addressLine2) {
        this.addressLine2Input.sendKeys(addressLine2);
    };

    getAddressLine2Input = function() {
        return this.addressLine2Input.getAttribute('value');
    };

    setAddressLine3Input = function(addressLine3) {
        this.addressLine3Input.sendKeys(addressLine3);
    };

    getAddressLine3Input = function() {
        return this.addressLine3Input.getAttribute('value');
    };

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    };

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    };

    setCountyInput = function(county) {
        this.countyInput.sendKeys(county);
    };

    getCountyInput = function() {
        return this.countyInput.getAttribute('value');
    };

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    };

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    };

    setPostcodeInput = function(postcode) {
        this.postcodeInput.sendKeys(postcode);
    };

    getPostcodeInput = function() {
        return this.postcodeInput.getAttribute('value');
    };

    addressTypeSelectLastOption = function() {
        this.addressTypeSelect.all(by.tagName('option')).last().click();
    };

    addressTypeSelectOption = function(option) {
        this.addressTypeSelect.sendKeys(option);
    };

    getAddressTypeSelect = function() {
        return this.addressTypeSelect;
    };

    getAddressTypeSelectedOption = function() {
        return this.addressTypeSelect.element(by.css('option:checked')).getText();
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
