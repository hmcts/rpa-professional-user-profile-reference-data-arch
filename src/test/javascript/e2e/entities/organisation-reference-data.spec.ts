import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Organisation e2e test', () => {

    let navBarPage: NavBarPage;
    let organisationDialogPage: OrganisationDialogPage;
    let organisationComponentsPage: OrganisationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Organisations', () => {
        navBarPage.goToEntity('organisation-reference-data');
        organisationComponentsPage = new OrganisationComponentsPage();
        expect(organisationComponentsPage.getTitle())
            .toMatch(/Organisations/);

    });

    it('should load create Organisation dialog', () => {
        organisationComponentsPage.clickOnCreateButton();
        organisationDialogPage = new OrganisationDialogPage();
        expect(organisationDialogPage.getModalTitle())
            .toMatch(/Create or edit a Organisation/);
        organisationDialogPage.close();
    });

    it('should create and save Organisations', () => {
        organisationComponentsPage.clickOnCreateButton();
        organisationDialogPage.setNameInput('name');
        expect(organisationDialogPage.getNameInput()).toMatch('name');
        organisationDialogPage.organisationTypeSelectLastOption();
        organisationDialogPage.save();
        expect(organisationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrganisationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-organisation-reference-data div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class OrganisationDialogPage {
    modalTitle = element(by.css('h4#myOrganisationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    organisationTypeSelect = element(by.css('select#field_organisationType'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    organisationTypeSelectLastOption = function() {
        this.organisationTypeSelect.all(by.tagName('option')).last().click();
    };

    organisationTypeSelectOption = function(option) {
        this.organisationTypeSelect.sendKeys(option);
    };

    getOrganisationTypeSelect = function() {
        return this.organisationTypeSelect;
    };

    getOrganisationTypeSelectedOption = function() {
        return this.organisationTypeSelect.element(by.css('option:checked')).getText();
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
