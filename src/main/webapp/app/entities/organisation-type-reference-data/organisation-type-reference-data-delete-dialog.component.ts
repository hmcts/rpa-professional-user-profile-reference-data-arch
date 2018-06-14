import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationTypeReferenceData } from './organisation-type-reference-data.model';
import { OrganisationTypeReferenceDataPopupService } from './organisation-type-reference-data-popup.service';
import { OrganisationTypeReferenceDataService } from './organisation-type-reference-data.service';

@Component({
    selector: 'jhi-organisation-type-reference-data-delete-dialog',
    templateUrl: './organisation-type-reference-data-delete-dialog.component.html'
})
export class OrganisationTypeReferenceDataDeleteDialogComponent {

    organisationType: OrganisationTypeReferenceData;

    constructor(
        private organisationTypeService: OrganisationTypeReferenceDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organisationTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'organisationTypeListModification',
                content: 'Deleted an organisationType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organisation-type-reference-data-delete-popup',
    template: ''
})
export class OrganisationTypeReferenceDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationTypePopupService: OrganisationTypeReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.organisationTypePopupService
                .open(OrganisationTypeReferenceDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
