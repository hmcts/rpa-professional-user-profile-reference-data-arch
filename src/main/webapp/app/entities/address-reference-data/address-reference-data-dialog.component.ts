import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AddressReferenceData } from './address-reference-data.model';
import { AddressReferenceDataPopupService } from './address-reference-data-popup.service';
import { AddressReferenceDataService } from './address-reference-data.service';
import { OrganisationReferenceData, OrganisationReferenceDataService } from '../organisation-reference-data';

@Component({
    selector: 'jhi-address-reference-data-dialog',
    templateUrl: './address-reference-data-dialog.component.html'
})
export class AddressReferenceDataDialogComponent implements OnInit {

    address: AddressReferenceData;
    isSaving: boolean;

    organisations: OrganisationReferenceData[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private addressService: AddressReferenceDataService,
        private organisationService: OrganisationReferenceDataService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organisationService.query()
            .subscribe((res: HttpResponse<OrganisationReferenceData[]>) => { this.organisations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(
                this.addressService.create(this.address));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AddressReferenceData>>) {
        result.subscribe((res: HttpResponse<AddressReferenceData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AddressReferenceData) {
        this.eventManager.broadcast({ name: 'addressListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrganisationById(index: number, item: OrganisationReferenceData) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-address-reference-data-popup',
    template: ''
})
export class AddressReferenceDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressPopupService: AddressReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressPopupService
                    .open(AddressReferenceDataDialogComponent as Component, params['id']);
            } else {
                this.addressPopupService
                    .open(AddressReferenceDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
