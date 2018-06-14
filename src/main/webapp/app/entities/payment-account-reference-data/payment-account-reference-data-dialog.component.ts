import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaymentAccountReferenceData } from './payment-account-reference-data.model';
import { PaymentAccountReferenceDataPopupService } from './payment-account-reference-data-popup.service';
import { PaymentAccountReferenceDataService } from './payment-account-reference-data.service';
import { OrganisationReferenceData, OrganisationReferenceDataService } from '../organisation-reference-data';
import { PaymentAccountTypeReferenceData, PaymentAccountTypeReferenceDataService } from '../payment-account-type-reference-data';

@Component({
    selector: 'jhi-payment-account-reference-data-dialog',
    templateUrl: './payment-account-reference-data-dialog.component.html'
})
export class PaymentAccountReferenceDataDialogComponent implements OnInit {

    paymentAccount: PaymentAccountReferenceData;
    isSaving: boolean;

    organisations: OrganisationReferenceData[];

    paymentaccounttypes: PaymentAccountTypeReferenceData[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private paymentAccountService: PaymentAccountReferenceDataService,
        private organisationService: OrganisationReferenceDataService,
        private paymentAccountTypeService: PaymentAccountTypeReferenceDataService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organisationService.query()
            .subscribe((res: HttpResponse<OrganisationReferenceData[]>) => { this.organisations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.paymentAccountTypeService.query()
            .subscribe((res: HttpResponse<PaymentAccountTypeReferenceData[]>) => { this.paymentaccounttypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.paymentAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paymentAccountService.update(this.paymentAccount));
        } else {
            this.subscribeToSaveResponse(
                this.paymentAccountService.create(this.paymentAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PaymentAccountReferenceData>>) {
        result.subscribe((res: HttpResponse<PaymentAccountReferenceData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PaymentAccountReferenceData) {
        this.eventManager.broadcast({ name: 'paymentAccountListModification', content: 'OK'});
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

    trackPaymentAccountTypeById(index: number, item: PaymentAccountTypeReferenceData) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-payment-account-reference-data-popup',
    template: ''
})
export class PaymentAccountReferenceDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentAccountPopupService: PaymentAccountReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paymentAccountPopupService
                    .open(PaymentAccountReferenceDataDialogComponent as Component, params['id']);
            } else {
                this.paymentAccountPopupService
                    .open(PaymentAccountReferenceDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
