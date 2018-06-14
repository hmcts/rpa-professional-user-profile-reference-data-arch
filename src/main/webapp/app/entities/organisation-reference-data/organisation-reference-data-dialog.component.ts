import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrganisationReferenceData } from './organisation-reference-data.model';
import { OrganisationReferenceDataPopupService } from './organisation-reference-data-popup.service';
import { OrganisationReferenceDataService } from './organisation-reference-data.service';
import { OrganisationTypeReferenceData, OrganisationTypeReferenceDataService } from '../organisation-type-reference-data';

@Component({
    selector: 'jhi-organisation-reference-data-dialog',
    templateUrl: './organisation-reference-data-dialog.component.html'
})
export class OrganisationReferenceDataDialogComponent implements OnInit {

    organisation: OrganisationReferenceData;
    isSaving: boolean;

    organisationtypes: OrganisationTypeReferenceData[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private organisationService: OrganisationReferenceDataService,
        private organisationTypeService: OrganisationTypeReferenceDataService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organisationTypeService.query()
            .subscribe((res: HttpResponse<OrganisationTypeReferenceData[]>) => { this.organisationtypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.organisation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.organisationService.update(this.organisation));
        } else {
            this.subscribeToSaveResponse(
                this.organisationService.create(this.organisation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrganisationReferenceData>>) {
        result.subscribe((res: HttpResponse<OrganisationReferenceData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrganisationReferenceData) {
        this.eventManager.broadcast({ name: 'organisationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrganisationTypeById(index: number, item: OrganisationTypeReferenceData) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-organisation-reference-data-popup',
    template: ''
})
export class OrganisationReferenceDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationPopupService: OrganisationReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.organisationPopupService
                    .open(OrganisationReferenceDataDialogComponent as Component, params['id']);
            } else {
                this.organisationPopupService
                    .open(OrganisationReferenceDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
