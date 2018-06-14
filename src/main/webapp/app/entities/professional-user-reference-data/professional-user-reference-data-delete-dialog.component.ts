import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessionalUserReferenceData } from './professional-user-reference-data.model';
import { ProfessionalUserReferenceDataPopupService } from './professional-user-reference-data-popup.service';
import { ProfessionalUserReferenceDataService } from './professional-user-reference-data.service';

@Component({
    selector: 'jhi-professional-user-reference-data-delete-dialog',
    templateUrl: './professional-user-reference-data-delete-dialog.component.html'
})
export class ProfessionalUserReferenceDataDeleteDialogComponent {

    professionalUser: ProfessionalUserReferenceData;

    constructor(
        private professionalUserService: ProfessionalUserReferenceDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.professionalUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'professionalUserListModification',
                content: 'Deleted an professionalUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-professional-user-reference-data-delete-popup',
    template: ''
})
export class ProfessionalUserReferenceDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professionalUserPopupService: ProfessionalUserReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.professionalUserPopupService
                .open(ProfessionalUserReferenceDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
