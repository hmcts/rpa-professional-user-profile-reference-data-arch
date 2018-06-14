import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProfessionalUserAccountAssignmentReferenceData } from './professional-user-account-assignment-reference-data.model';
import { ProfessionalUserAccountAssignmentReferenceDataPopupService } from './professional-user-account-assignment-reference-data-popup.service';
import { ProfessionalUserAccountAssignmentReferenceDataService } from './professional-user-account-assignment-reference-data.service';
import { PaymentAccountReferenceData, PaymentAccountReferenceDataService } from '../payment-account-reference-data';
import { ProfessionalUserReferenceData, ProfessionalUserReferenceDataService } from '../professional-user-reference-data';

@Component({
    selector: 'jhi-professional-user-account-assignment-reference-data-dialog',
    templateUrl: './professional-user-account-assignment-reference-data-dialog.component.html'
})
export class ProfessionalUserAccountAssignmentReferenceDataDialogComponent implements OnInit {

    professionalUserAccountAssignment: ProfessionalUserAccountAssignmentReferenceData;
    isSaving: boolean;

    paymentaccounts: PaymentAccountReferenceData[];

    professionalusers: ProfessionalUserReferenceData[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private professionalUserAccountAssignmentService: ProfessionalUserAccountAssignmentReferenceDataService,
        private paymentAccountService: PaymentAccountReferenceDataService,
        private professionalUserService: ProfessionalUserReferenceDataService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.paymentAccountService.query()
            .subscribe((res: HttpResponse<PaymentAccountReferenceData[]>) => { this.paymentaccounts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.professionalUserService.query()
            .subscribe((res: HttpResponse<ProfessionalUserReferenceData[]>) => { this.professionalusers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.professionalUserAccountAssignment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.professionalUserAccountAssignmentService.update(this.professionalUserAccountAssignment));
        } else {
            this.subscribeToSaveResponse(
                this.professionalUserAccountAssignmentService.create(this.professionalUserAccountAssignment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProfessionalUserAccountAssignmentReferenceData>>) {
        result.subscribe((res: HttpResponse<ProfessionalUserAccountAssignmentReferenceData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProfessionalUserAccountAssignmentReferenceData) {
        this.eventManager.broadcast({ name: 'professionalUserAccountAssignmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPaymentAccountById(index: number, item: PaymentAccountReferenceData) {
        return item.id;
    }

    trackProfessionalUserById(index: number, item: ProfessionalUserReferenceData) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-professional-user-account-assignment-reference-data-popup',
    template: ''
})
export class ProfessionalUserAccountAssignmentReferenceDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professionalUserAccountAssignmentPopupService: ProfessionalUserAccountAssignmentReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.professionalUserAccountAssignmentPopupService
                    .open(ProfessionalUserAccountAssignmentReferenceDataDialogComponent as Component, params['id']);
            } else {
                this.professionalUserAccountAssignmentPopupService
                    .open(ProfessionalUserAccountAssignmentReferenceDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
