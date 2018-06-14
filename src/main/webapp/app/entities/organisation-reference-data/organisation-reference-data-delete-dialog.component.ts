import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationReferenceData } from './organisation-reference-data.model';
import { OrganisationReferenceDataPopupService } from './organisation-reference-data-popup.service';
import { OrganisationReferenceDataService } from './organisation-reference-data.service';

@Component({
    selector: 'jhi-organisation-reference-data-delete-dialog',
    templateUrl: './organisation-reference-data-delete-dialog.component.html'
})
export class OrganisationReferenceDataDeleteDialogComponent {

    organisation: OrganisationReferenceData;

    constructor(
        private organisationService: OrganisationReferenceDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organisationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'organisationListModification',
                content: 'Deleted an organisation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organisation-reference-data-delete-popup',
    template: ''
})
export class OrganisationReferenceDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationPopupService: OrganisationReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.organisationPopupService
                .open(OrganisationReferenceDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
