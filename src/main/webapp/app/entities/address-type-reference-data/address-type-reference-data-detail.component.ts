import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AddressTypeReferenceData } from './address-type-reference-data.model';
import { AddressTypeReferenceDataService } from './address-type-reference-data.service';

@Component({
    selector: 'jhi-address-type-reference-data-detail',
    templateUrl: './address-type-reference-data-detail.component.html'
})
export class AddressTypeReferenceDataDetailComponent implements OnInit, OnDestroy {

    addressType: AddressTypeReferenceData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private addressTypeService: AddressTypeReferenceDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAddressTypes();
    }

    load(id) {
        this.addressTypeService.find(id)
            .subscribe((addressTypeResponse: HttpResponse<AddressTypeReferenceData>) => {
                this.addressType = addressTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAddressTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'addressTypeListModification',
            (response) => this.load(this.addressType.id)
        );
    }
}
