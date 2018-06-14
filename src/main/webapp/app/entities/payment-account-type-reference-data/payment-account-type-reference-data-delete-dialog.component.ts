import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentAccountTypeReferenceData } from './payment-account-type-reference-data.model';
import { PaymentAccountTypeReferenceDataPopupService } from './payment-account-type-reference-data-popup.service';
import { PaymentAccountTypeReferenceDataService } from './payment-account-type-reference-data.service';

@Component({
    selector: 'jhi-payment-account-type-reference-data-delete-dialog',
    templateUrl: './payment-account-type-reference-data-delete-dialog.component.html'
})
export class PaymentAccountTypeReferenceDataDeleteDialogComponent {

    paymentAccountType: PaymentAccountTypeReferenceData;

    constructor(
        private paymentAccountTypeService: PaymentAccountTypeReferenceDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentAccountTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paymentAccountTypeListModification',
                content: 'Deleted an paymentAccountType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-account-type-reference-data-delete-popup',
    template: ''
})
export class PaymentAccountTypeReferenceDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentAccountTypePopupService: PaymentAccountTypeReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paymentAccountTypePopupService
                .open(PaymentAccountTypeReferenceDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
