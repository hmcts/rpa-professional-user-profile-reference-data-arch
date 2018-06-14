import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressTypeReferenceData } from './address-type-reference-data.model';
import { AddressTypeReferenceDataPopupService } from './address-type-reference-data-popup.service';
import { AddressTypeReferenceDataService } from './address-type-reference-data.service';

@Component({
    selector: 'jhi-address-type-reference-data-delete-dialog',
    templateUrl: './address-type-reference-data-delete-dialog.component.html'
})
export class AddressTypeReferenceDataDeleteDialogComponent {

    addressType: AddressTypeReferenceData;

    constructor(
        private addressTypeService: AddressTypeReferenceDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'addressTypeListModification',
                content: 'Deleted an addressType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-type-reference-data-delete-popup',
    template: ''
})
export class AddressTypeReferenceDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressTypePopupService: AddressTypeReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.addressTypePopupService
                .open(AddressTypeReferenceDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
