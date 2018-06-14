import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentAccountReferenceData } from './payment-account-reference-data.model';
import { PaymentAccountReferenceDataPopupService } from './payment-account-reference-data-popup.service';
import { PaymentAccountReferenceDataService } from './payment-account-reference-data.service';

@Component({
    selector: 'jhi-payment-account-reference-data-delete-dialog',
    templateUrl: './payment-account-reference-data-delete-dialog.component.html'
})
export class PaymentAccountReferenceDataDeleteDialogComponent {

    paymentAccount: PaymentAccountReferenceData;

    constructor(
        private paymentAccountService: PaymentAccountReferenceDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentAccountService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paymentAccountListModification',
                content: 'Deleted an paymentAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-account-reference-data-delete-popup',
    template: ''
})
export class PaymentAccountReferenceDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentAccountPopupService: PaymentAccountReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paymentAccountPopupService
                .open(PaymentAccountReferenceDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
