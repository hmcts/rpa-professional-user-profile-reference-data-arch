import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationTypeReferenceData } from './organisation-type-reference-data.model';
import { OrganisationTypeReferenceDataPopupService } from './organisation-type-reference-data-popup.service';
import { OrganisationTypeReferenceDataService } from './organisation-type-reference-data.service';

@Component({
    selector: 'jhi-organisation-type-reference-data-dialog',
    templateUrl: './organisation-type-reference-data-dialog.component.html'
})
export class OrganisationTypeReferenceDataDialogComponent implements OnInit {

    organisationType: OrganisationTypeReferenceData;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private organisationTypeService: OrganisationTypeReferenceDataService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.organisationType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.organisationTypeService.update(this.organisationType));
        } else {
            this.subscribeToSaveResponse(
                this.organisationTypeService.create(this.organisationType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrganisationTypeReferenceData>>) {
        result.subscribe((res: HttpResponse<OrganisationTypeReferenceData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrganisationTypeReferenceData) {
        this.eventManager.broadcast({ name: 'organisationTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-organisation-type-reference-data-popup',
    template: ''
})
export class OrganisationTypeReferenceDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationTypePopupService: OrganisationTypeReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.organisationTypePopupService
                    .open(OrganisationTypeReferenceDataDialogComponent as Component, params['id']);
            } else {
                this.organisationTypePopupService
                    .open(OrganisationTypeReferenceDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
