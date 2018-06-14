import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressTypeReferenceData } from './address-type-reference-data.model';
import { AddressTypeReferenceDataPopupService } from './address-type-reference-data-popup.service';
import { AddressTypeReferenceDataService } from './address-type-reference-data.service';

@Component({
    selector: 'jhi-address-type-reference-data-dialog',
    templateUrl: './address-type-reference-data-dialog.component.html'
})
export class AddressTypeReferenceDataDialogComponent implements OnInit {

    addressType: AddressTypeReferenceData;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private addressTypeService: AddressTypeReferenceDataService,
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
        if (this.addressType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressTypeService.update(this.addressType));
        } else {
            this.subscribeToSaveResponse(
                this.addressTypeService.create(this.addressType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AddressTypeReferenceData>>) {
        result.subscribe((res: HttpResponse<AddressTypeReferenceData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AddressTypeReferenceData) {
        this.eventManager.broadcast({ name: 'addressTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-address-type-reference-data-popup',
    template: ''
})
export class AddressTypeReferenceDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressTypePopupService: AddressTypeReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressTypePopupService
                    .open(AddressTypeReferenceDataDialogComponent as Component, params['id']);
            } else {
                this.addressTypePopupService
                    .open(AddressTypeReferenceDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
