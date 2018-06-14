import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('OrganisationType e2e test', () => {

    let navBarPage: NavBarPage;
    let organisationTypeDialogPage: OrganisationTypeDialogPage;
    let organisationTypeComponentsPage: OrganisationTypeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrganisationTypes', () => {
        navBarPage.goToEntity('organisation-type-reference-data');
        organisationTypeComponentsPage = new OrganisationTypeComponentsPage();
        expect(organisationTypeComponentsPage.getTitle())
            .toMatch(/Organisation Types/);

    });

    it('should load create OrganisationType dialog', () => {
        organisationTypeComponentsPage.clickOnCreateButton();
        organisationTypeDialogPage = new OrganisationTypeDialogPage();
        expect(organisationTypeDialogPage.getModalTitle())
            .toMatch(/Create or edit a Organisation Type/);
        organisationTypeDialogPage.close();
    });

    it('should create and save OrganisationTypes', () => {
        organisationTypeComponentsPage.clickOnCreateButton();
        organisationTypeDialogPage.setNameInput('name');
        expect(organisationTypeDialogPage.getNameInput()).toMatch('name');
        organisationTypeDialogPage.save();
        expect(organisationTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrganisationTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-organisation-type-reference-data div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class OrganisationTypeDialogPage {
    modalTitle = element(by.css('h4#myOrganisationTypeLabel'));
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
