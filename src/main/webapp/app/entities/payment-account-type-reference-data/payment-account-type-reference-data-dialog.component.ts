import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentAccountTypeReferenceData } from './payment-account-type-reference-data.model';
import { PaymentAccountTypeReferenceDataPopupService } from './payment-account-type-reference-data-popup.service';
import { PaymentAccountTypeReferenceDataService } from './payment-account-type-reference-data.service';

@Component({
    selector: 'jhi-payment-account-type-reference-data-dialog',
    templateUrl: './payment-account-type-reference-data-dialog.component.html'
})
export class PaymentAccountTypeReferenceDataDialogComponent implements OnInit {

    paymentAccountType: PaymentAccountTypeReferenceData;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private paymentAccountTypeService: PaymentAccountTypeReferenceDataService,
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
        if (this.paymentAccountType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paymentAccountTypeService.update(this.paymentAccountType));
        } else {
            this.subscribeToSaveResponse(
                this.paymentAccountTypeService.create(this.paymentAccountType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PaymentAccountTypeReferenceData>>) {
        result.subscribe((res: HttpResponse<PaymentAccountTypeReferenceData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PaymentAccountTypeReferenceData) {
        this.eventManager.broadcast({ name: 'paymentAccountTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-payment-account-type-reference-data-popup',
    template: ''
})
export class PaymentAccountTypeReferenceDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentAccountTypePopupService: PaymentAccountTypeReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paymentAccountTypePopupService
                    .open(PaymentAccountTypeReferenceDataDialogComponent as Component, params['id']);
            } else {
                this.paymentAccountTypePopupService
                    .open(PaymentAccountTypeReferenceDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
