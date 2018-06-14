import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentAccountReferenceData } from './payment-account-reference-data.model';
import { PaymentAccountReferenceDataService } from './payment-account-reference-data.service';

@Component({
    selector: 'jhi-payment-account-reference-data-detail',
    templateUrl: './payment-account-reference-data-detail.component.html'
})
export class PaymentAccountReferenceDataDetailComponent implements OnInit, OnDestroy {

    paymentAccount: PaymentAccountReferenceData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private paymentAccountService: PaymentAccountReferenceDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPaymentAccounts();
    }

    load(id) {
        this.paymentAccountService.find(id)
            .subscribe((paymentAccountResponse: HttpResponse<PaymentAccountReferenceData>) => {
                this.paymentAccount = paymentAccountResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPaymentAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paymentAccountListModification',
            (response) => this.load(this.paymentAccount.id)
        );
    }
}
