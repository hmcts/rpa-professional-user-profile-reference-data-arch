import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentAccountTypeReferenceData } from './payment-account-type-reference-data.model';
import { PaymentAccountTypeReferenceDataService } from './payment-account-type-reference-data.service';

@Component({
    selector: 'jhi-payment-account-type-reference-data-detail',
    templateUrl: './payment-account-type-reference-data-detail.component.html'
})
export class PaymentAccountTypeReferenceDataDetailComponent implements OnInit, OnDestroy {

    paymentAccountType: PaymentAccountTypeReferenceData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private paymentAccountTypeService: PaymentAccountTypeReferenceDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPaymentAccountTypes();
    }

    load(id) {
        this.paymentAccountTypeService.find(id)
            .subscribe((paymentAccountTypeResponse: HttpResponse<PaymentAccountTypeReferenceData>) => {
                this.paymentAccountType = paymentAccountTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPaymentAccountTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paymentAccountTypeListModification',
            (response) => this.load(this.paymentAccountType.id)
        );
    }
}
